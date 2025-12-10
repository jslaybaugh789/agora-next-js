/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useParams } from "next/navigation";
import * as client from '../client';
import * as shopClient from '../../shop/[sid]/client';
import * as productClient from '../../shop/[sid]/product/[pid]/client';
import * as wishlistClient from './client';
import { useEffect, useState } from "react";
import { GiGreekTemple } from "react-icons/gi";
import { Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>({});
    const [shops, setShops] = useState<any>({});
    const [products, setProducts] = useState<any>([]);
    const { uid } = useParams();
    const getUser = async () => {
        if (uid)  {
            const user = await client.findUserById(uid.toString());
            setProfile(user);
        }
    }
    const getProducts = async () => {
        if (uid)  {
            const wishlists = await wishlistClient.findWishlistsByBuyerId(uid.toString());
            const wishlistProducts = [];
            for (const wishlist of wishlists) {
                const product = await productClient.findProductById(wishlist.productId);
                wishlistProducts.push(product);
            }
            setProducts(wishlistProducts);
        }
    }
    const getShops = async () => {
        if (uid)  {
            const shops = await shopClient.findShopsBySellerId(uid.toString());
            setShops(shops);
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUser();
        getProducts();
        getShops();
    }, []);
    return (
        <div id='agora-profile-page'>
            <h1 className="text-primary"><GiGreekTemple className="me-2"/>{profile.username}&apos;s Profile</h1> <hr/>
            {profile.role === "BUYER" && 
            <div>
                <h3 className='text-primary'>{profile.username}&apos;s Wishlist </h3>
                <ListGroup className="rounded-0" id="wd-modules">
                    {products && products.map((product: any) => (
                        <ListGroupItem className="p-3 mb-5 fs-5 w-50 bg-dark text-primary" key={product._id}>
                            <Card className='p-2 bg-secondary text-primary'>
                                <CardBody>
                                <CardTitle className="agora-product-title text-wrap">
                                    Product Name:  {product.name}
                                </CardTitle>
                                <CardText  className="agora-product-price text-wrap" style={{ height: "40px" }}>
                                    Price: {product.price}</CardText>
                                <CardText  className="agora-product-description text-wrap" style={{ height: "100px" }}>
                                    {product.description}
                                </CardText>
                                <Link href={`/shop/${product.shopId}`}>View Shop</Link>
                                </CardBody>
                            </Card>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
            }
            {profile.role === "SELLER" &&
            <div>
                <h3 className='text-primary'>{profile.username}&apos;s Shops </h3>
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
    );
}