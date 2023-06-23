import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import UserPage from './pages/User';
import PostPage from './pages/Post';
import MainLayout from "./layouts/MainLayout";

function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path ="/" index element={<HomePage />} />
        <Route path ="/user/:id" index element={<UserPage />} />
        <Route path ="/post/:id" index element={<PostPage />} />
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
  );
}

export default RoutesContainer;
