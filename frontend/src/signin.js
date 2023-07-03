import { useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify'
import axios from "axios"

const Signin = () => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [pass, SetPass] = useState('');
    const [cpass, SetCpass] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!name | !email | !pass | !cpass) {
            toast.error('please fill all fields', {
                position: "top-right",
                theme: "dark",
            })
        }else if(pass !== cpass){
            toast.error('confirm password does not match', {
                position: "top-right",
                theme: "dark",
            })
        } else {
            try{
             await axios.post("http://localhost:8000/signin",{name,email,password:pass});
             toast.success('successfully registered,login to continue', {
                position: "top-right",
                theme: "dark",
            });
              SetName('');
              SetEmail('');
              SetPass('');
              SetCpass('');
            }catch(err){
                toast.error("something went wrong please try again", {
                    position: "top-right",
                    theme: "dark",
                })
                console.log(err)
            }
          
        }

    }

    return (
        <div className="sigd">
            <ToastContainer position="top-right"
                theme="dark" />
            <Container className="bg-light text-white sig2">
                <Row>
                    <Col lg='12' className=" bg-dark" >
                        <h3 className="text-center mt-3 ">Create account</h3>
                        <form onSubmit={handleSubmit}>
                            <Table variant="dark" className="mt-3">
                                <tbody>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Name</label></td>
                                        <td> <input type="text" placeholder="Enter your Name" className="ii" value={name} onChange={(e) => SetName(e.target.value)}></input></td>
                                    </tr>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Email</label></td>
                                        <td> <input type="email" placeholder="Enter your email" className="ii" value={email} onChange={(e) => SetEmail(e.target.value)}></input></td>
                                    </tr>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Password</label></td>
                                        <td> <input type="password" placeholder="Enter your password" className="ii" value={pass} onChange={(e) => SetPass(e.target.value)}></input></td>
                                    </tr>
                                    <tr className="rrr">
                                        <td>  <label className="ii">Confirm password</label></td>
                                        <td> <input type="password" placeholder="Enter your password" className="ii" value={cpass} onChange={(e) => SetCpass(e.target.value)}></input></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Container className="text-center" > <Button type="submit" className="logb  mt-5">signup</Button>   <p className="text-center mt-4">Already a User? <Link to={'/Login'} >Login</Link></p>
                         
                       </Container>
                        </form>

                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Signin;