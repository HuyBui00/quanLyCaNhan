import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "antd";
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MenuBar from './pages/Share/header';
import Footer from './pages/Share/footer';
import 'antd/dist/reset.css'
import {Slide, ToastContainer } from "react-toastify";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '97vh' }}>
        {/* Header cố định */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
          <MenuBar />
        </div>

        {/* Nội dung chính */}
        <Content
          style={{
            marginTop: 60, // Độ cao Header
            // marginBottom: 60, // Độ cao Footer
            overflowY: 'auto',
            flex: 1,
            // padding: '0 24px',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>

        {/* Footer cố định */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}>
          <Footer />
        </div>
      </Layout>
      <ToastContainer theme="colored" autoClose={5000} transition={Slide} />
    </Router>
  );
}

export default App;
