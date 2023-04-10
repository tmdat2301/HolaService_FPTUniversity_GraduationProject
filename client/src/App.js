import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login, Home, Category, Public, DetailPost, Search, AboutUs } from './pages/public'
import { Admin, ManageUser, Dashboard, ManageEatery, ManageOthers, ManageRented } from './pages/admin'
import { CreatePost, Member, Personal } from './pages/member'
import { Loading } from './components'
import path from './ultils/path'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'



function App() {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(actions.getFoodtypes())
    setTimeout(() => {
      dispatch(actions.getCurrent())
    }, 500)
    dispatch(actions.getCategories(currentData?.id))
  }, [isLoggedIn])

  return (
    <div className="bg-primary min-h-screen flex justify-center relative">
      {isLoading && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Loading />
      </div>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.CATEGORY} element={<Category />} />
          <Route path={path.DETAIL__PID__TITLE} element={<DetailPost />} />
          <Route path={path.SEARCH} element={<Search />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.HOME} element={<Home />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.MEMBER} element={<Member />}>
          <Route path={path.CREATE_POST} element={<CreatePost isAdmin={false} />} />
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MANAGE_EATERY} element={<ManageEatery />} />
          <Route path={path.MANAGE_RENTED} element={<ManageRented />} />
          <Route path={path.MANAGE_OTHERS} element={<ManageOthers />} />
        </Route>
        <Route path={path.ADMIN} element={<Admin />} >
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MANAGE_EATERY} element={<ManageEatery isAdmin />} />
          <Route path={path.MANAGE_RENTED} element={<ManageRented isAdmin />} />
          <Route path={path.MANAGE_OTHERS} element={<ManageOthers isAdmin />} />
          <Route path={path.CREATE_POST} element={<CreatePost isAdmin />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;