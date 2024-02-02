import axios from "axios";
import { useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');

const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email | !password) {
            toast.error('please input all fields', {
                position: "top-right",
                theme: "dark"
            })
        } else {
            try {
                const response = await axios.post('http://localhost:8000/login', { email, password });
                toast.success("successfully logged in", {
                    position: "top-right",
                    theme: "dark"
                });
                const token = response.data.accessToken

                localStorage.setItem('token',token);
                Navigate('/checkout')
            } catch (error) {
                if(error.response && error.response.status === 401){
                     const message =error.response.data
                toast.error(message, {
                    position: "top-right",
                    theme: "dark"
                })
                }
                if(error.response && error.response.status === 400){
                    const message = error.response.data
                    toast.error(message, {
                        position: "top-right",
                        theme: "dark"
                    })
                }
               
                // console.log(error)
            }
        }
    }
    return (
        <div className="sigd">
            <ToastContainer />
            <Container className="bg-light text-white sig">
                <Row>
                    <Col lg='12' md='12' sm='12' className=" bg-dark cols" >
                        <h3 className="text-center mt-3 ">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <Table variant="dark" className="mt-3">
                                <tbody>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Email</label></td>
                                        <td> <input type="email" placeholder="Enter your email" className="ii" value={email} onChange={(e) => setEmail(e.target.value)}></input></td>
                                    </tr>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Password</label></td>
                                        <td> <input type="password" placeholder="Enter your password" className="ii" value={password} onChange={(e) => SetPassword(e.target.value)}></input></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Container className="text-center"> <Button type="submit" className="logb mb-3 mt-5 text-center">Login</Button> <p className="text-center">New user?<Link to={'/signin'}>Signup</Link></p></Container>
                          
                        </form>

                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default Login