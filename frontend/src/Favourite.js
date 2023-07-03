import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import search from "./search.png";
import compare from "./compare.png";
import { remfav } from "./reducers/cartreducer";



const Favoruite = () => {

  const fav = useSelector((state) => state.cart.fav)
  const dispatch = useDispatch();
  return (
    <div>
      {fav.length === 0 ? (<div>
        <Container className="cartnum1 text-center">
          <h4 className="mt-5">No Favourites Added</h4>
        </Container>
      </div>) : (<div>
        <Container className="favcont">
          <Row className=" m-auto pt-5">
            {fav.map((fav) => (
              <Col key={fav.id} lg="3" md='6' sm='6' className="cont" >

                <div >
                  <div className="prim">
                    <Link to={`../pd/${fav.id}`}><img src={fav.image} className='proimg'></img></Link>
                    <ul className="oul">
                      <li className="oli"><img src={compare} className='oim' type='button' alt='compare' /></li>
                      <li className="oli "> <img src={search} className='oim' type='button' alt='search' /></li>
                    </ul>

                  </div>
                  <div >
                    <Row>
                      <Col>
                        <p className="prot">{fav.name}</p>
                      </Col>
                      <Col className="text-center remcol">
                       <div className="rem mt-2  text-dark fw-bold" type="button" onClick={() => {dispatch(remfav(fav))}}>
                         X
                       </div>
                       
                      </Col>


                    </Row>
                    <Row>
                      <Col>
                        <p className="prot1">${fav.price}</p>
                      </Col>
                      <Col className="text-end">
                        <label type='button' className="color"></label>
                        <label type='button' className="color2"></label>
                        <label type='button' className="color3"></label>
                      </Col>
                    </Row>

                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container></div>)}

    </div>
  )
}

export default Favoruite;