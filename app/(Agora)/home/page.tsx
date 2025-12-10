/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";
import * as productClient from '../shop/[sid]/product/[pid]/client';
import * as wishlistClient from '../profile/[uid]/client';
import * as shopClient from '../shop/[sid]/client';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home() {
    const [profile, setProfile] = useState<any>({});
    const { currentUser } = useSelector((state: RootState) => state.profilesReducer);
    const [products, setProducts] = useState<any>([]);
    const [shops, setShops] = useState<any>([]);
    const fetchProfile = () => {
        if (currentUser) {
            setProfile(currentUser);
        } 
    };
    const fetchProducts = async () => {
        if (!currentUser) {
            const allProducts = await productClient.findAllProducts();
            setProducts(allProducts);
        } else {
            console.log(currentUser);
            const wishlists = await wishlistClient.findWishlistsByBuyerId((currentUser as any)._id);
            const wishlistProducts = [];
            for (const wishlist of wishlists) {
                const product = await productClient.findProductById(wishlist.productId);
                wishlistProducts.push(product);
            }
            setProducts(wishlistProducts);
        }
    }
    const fetchShops = async () => {
        if (currentUser) {
            const shops = await shopClient.findShopsBySellerId((currentUser as any)._id);
            console.log(shops);
            setShops(shops);
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
        fetchProducts();
        fetchShops();
    }, []);
    return (
        <div id="agora-home">
            <h1 className='text-primary'><GiGreekTemple className='me-3'/>Agora Home</h1><hr/>
            <div id="agora-products">
                {profile.role != "SELLER" && products &&
                <div>
                <h3 className='text-primary'> Products</h3>
                <Row xs={1} md={5} className="g-4">
                {products.map((product: any) => (
                    <ListGroupItem className="p-3 mb-5 me-3 fs-5 w-25 bg-dark text-primary" key={product._id}>
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
                            <Link href={`/shop/${product.shopId}`}>View Shop</Link>
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                ))}
                </Row>
                </div>}
                {profile.role === "SELLER" && shops &&
                <div>
                <h3 className='text-primary'>Shops</h3>
                <ListGroup className="rounded-0" id="wd-modules">
                    {shops.map((shop: any) => (
                        <ListGroupItem className="p-3 mb-5 fs-5 w-50 bg-dark text-primary" key={shop._id}>
                            <Link href={`/shop/${shop._id}`}>{shop.name}</Link>
                        </ListGroupItem>
                    ))}
                </ListGroup>
                </div>
                }
            </div>
        </div>
    )
}