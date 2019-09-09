import React from 'react'
import { Route, Redirect, } from 'react-router-dom'
import Store from '../../store/index'
// console.log(Store,"ljh-1234")
{/* <PrivateRoute exact path="/authentication" component={Authentication} /> */}


const PrivateRoute = ({component: Component, ...rest}) =>{
  return (
    <Route {...rest} render={(props) => (
      // <Component {...props} />
      !!Store.isLogin
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/signin',
          state: {from: props.location},
          search:props.location.pathname + props.location.search
        }}/>
    )}/>
  )
} 

export default PrivateRoute 