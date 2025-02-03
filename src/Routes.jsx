import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from './pages/Homepage';
import MainLayout from "./layouts/MainLayout";
import Agents from "./pages/Agents";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ParentComponent from "./pages/ParentComponent";
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<PublicLayout />}>
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="" element={<MainLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="agents" element={<Agents />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout/>} />
                    <Route path="parent" element={<ParentComponent/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter

