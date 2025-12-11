/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiGreekTemple } from "react-icons/gi";
import * as searchClient from '../../search/[query]/client';
import * as productClient from '../../shop/[sid]/product/[pid]/client';
import Link from "next/link";
import { Row, ListGroupItem, Card, CardTitle, CardBody, CardText } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function Details() {
    const { id } = useParams();
    const [video, setVideo] = useState<any>({});
    const [products, setProducts] = useState<any>([]);
    const fetchVideo = async () => {
        if (id) {
            const results = await searchClient.findVideoById(id.toString());
            const thisVideo = results.items[0];
            setVideo(thisVideo);
        }
    }
    const fetchProducts = async () => {
        if ('snippet' in video) {
            const allProducts = await productClient.findAllProducts();
            console.log(allProducts);
            const filteredProducts = allProducts.filter((product: any) => 
                video.snippet.title.toLowerCase().includes(product.name.toLowerCase())
            );
            setProducts(filteredProducts);
            console.log(video.snippet.title.toLowerCase())
            console.log(filteredProducts);
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchVideo();
    }, []);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, [video]);
    return (
        <div id="agora-details">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Details </h1> <hr/>
            {'snippet' in video &&
            <div>
            <h4>Video Title: {video.snippet.title} </h4>
            <p>Channel: {video.snippet.channelTitle} </p>
            <p> {video.snippet.description}</p>
            <Link href={`https://www.youtube.com/watch?v=${video.id}`}>
                Watch this Video
            </Link>
            </div>
            }
            <hr/>
            <h3 className='text-primary'> Related Products </h3> <br/>
            <Row xs={1} md={5} className="g-4">
                {products.map((product: any) => (
                    <ListGroupItem className="p-3 mb-5 me-3 fs-5 bg-dark text-primary" key={product._id}>
                        <Card className='p-2 bg-secondary text-primary'>
                            <CardBody>
                            <CardTitle className="agora-product-title text-wrap">
                                Product Name:  {product.name}
                            </CardTitle>
                            <CardText  className="agora-product-price text-wrap" >
                                Price: {product.price}</CardText>
                            <CardText  className="agora-product-description text-wrap text-black">
                                {product.description}
                            </CardText>
                            <Link href={`/shop/${product.shopId}`}>View Shop</Link> <br/>
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                ))}
            </Row>
        </div>
    )
}