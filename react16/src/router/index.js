import React, { lazy } from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/login/index.jsx';
import NewCar from '../pages/newCar/index.jsx';
import Rank from '../pages/rank/index.jsx';

// 使用store的方法
import { useLocalReducer } from '../store/useLocalReducer';
import { context } from '../hooks/useLocalContext';

const BasicMap = () => {

  const [state, dispatch] = useLocalReducer();

  return (
    <context.Provider value={{ state, dispatch }}>
      <HashRouter>
        <Routes>
          {/* App页面 */}
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/new-car" element={<NewCar></NewCar>} />
          <Route path="/rank" element={<Rank></Rank>} />
          {/* <Route path="/login" component={lazy(() => import('../pages/login/index.jsx'))}/>
          <Route path="/new-car" component={lazy(() => import('../pages/newCar/index.jsx'))} />
          <Route path="/rank" component={lazy(() => import('../pages/rank/index.jsx'))} /> */}
        </Routes>
      </HashRouter>
    </context.Provider>
  );
}

export default BasicMap
