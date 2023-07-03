import { Container } from "react-bootstrap";

const Nopage = () => {
    return (
        <div>
            <Container className="favcont text-center mt-5 pt-5 pb-5">
                 <h1 className="text-danger">404</h1>
            <p className="text-secondary">page not found</p>
            </Container>
           
        </div>
    )
}

export default Nopage;