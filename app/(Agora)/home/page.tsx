import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";

export default function Home() {
    const products = [
        {_id: 1, name: "product 1", description: "i am a product"},
        {_id: 2, name: "product 2", description: "i am a product"},
        {_id: 3, name: "product 3", description: "i am a product"}
    ]
    return (
        <div id="agora-home">
            <h1 className='text-primary'><GiGreekTemple className='me-3'/>Agora Home</h1><hr/>
            <div id="agora-products">
                <Row xs={1} md={5} className="g-4">
                {products.map((product) => (
                <Col key={product.name} className="agora-product pt-3" style={{ width: "300px" }}>
                    <Card className='bg-secondary'>
                    <Link href={`/Products/${product._id}/`}
                        className="agora-product-link text-decoration-none text-dark">
                    {/*<CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>*/}
                    <CardBody>
                    <CardTitle className="agora-product-title text-nowrap overflow-hidden">{product.name}</CardTitle>
                    <CardText  className="agora-product-description overflow-hidden" style={{ height: "100px" }}>
                        {product.description}</CardText>
                    <Button variant="primary">Go</Button>
                    {/*<Button onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                            }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                    </Button>
                    <Button id="wd-edit-course-click"
                        onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                    </Button>*/}
                    </CardBody>
                    </Link>
                    </Card>
                </Col>
                ))}
                </Row>
            </div>
        </div>
    )
}