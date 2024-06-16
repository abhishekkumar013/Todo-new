import React, { useEffect, useState } from 'react'
import './Todo.css'
import Navbar from '../Layout/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const [list, setList] = useState()
  const [allListData, setAllListData] = useState([])
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  const fetchListData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/lists/get-list/${userId}`,
      )

      if (data?.success) {
        setAllListData([])
        const updatedData = data.allList.map((item) => ({
          id: item._id,
          list: item.list,
        }))

        // Update the state with the new data
        // setAllListData((prevValue) => [...prevValue, ...updatedData])

        setAllListData(data.allList.length > 0 ? updatedData : [])

        // toast.success(data.message)
      }
    } catch (error) {
      console.error(error.message)
      // toast.error('Error in fetching data')
    }
  }

  useEffect(() => {
    const authDataString = localStorage.getItem('auth')
    if (authDataString) {
      const authData = JSON.parse(authDataString)
      const userIdFromStorage = authData.user._id
      setUserId(userIdFromStorage)
    }

    fetchListData()
  }, [userId])

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        'http://localhost:8080/api/v1/lists/create-list',
        { list, user: userId },
      )

      if (result && result.data.success) {
        toast.success(result && result.data.message)
        fetchListData()
      } else {
        toast.error('Unable to Add Item')
      }
      setList('')
      fetchListData()
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        error,
        message: 'Error in Adding Items',
      })
    }
  }
  const handleDelete = async (itemId) => {
    try {
      const result = await axios.delete(
        `http://localhost:8080/api/v1/lists/delete-list/${itemId}`,
      )

      if (result && result?.data?.success) {
        toast.success(result.data.message)

        fetchListData()
        // navigate('/todo')
      } else {
        toast.error('Unable to delete item')
        // navigate('/todo')
      }
    } catch (error) {
      console.error('Error deleting item:', error.message)
      toast.error('Error in deleting item')
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="list">
          <div className="input">
            <input
              placeholder="add list"
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
            <button>
              <span onClick={handleSubmit}>ADD</span>
            </button>
          </div>
          <hr />
          <div className="dis-item">
            <ul>
              {allListData.map((item, i) => (
                <li className="li" key={i} id={i}>
                  {item.list}{' '}
                  <button
                    className="del-btn"
                    onClick={(event) => {
                      event.preventDefault()
                      handleDelete(item.id)
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
