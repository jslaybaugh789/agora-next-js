/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiGreekTemple } from "react-icons/gi";
import * as shopClient from './client';
import * as productClient from './product/[pid]/client';
import * as wishlistClient from '../../profile/[uid]/client';
import Link from "next/link";
import { Row, ListGroupItem, Card, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function Shop() {
    const [user, setUser] = useState<any>({});
    const [shop, setShop] = useState<any>({});
    const { currentUser } = useSelector((state: RootState) => state.profilesReducer);
    const fetchProfile = () => {
        if (currentUser) setUser(currentUser);
    };
    const { sid } = useParams();
    const [products, setProducts] = useState<any>([]);
    const [product, setProduct] = useState<any>({});
    const getProducts = async () => {
        if (sid) {
            const shopProducts = await productClient.findProductsByShopId(sid.toString());
            setProducts(shopProducts);
        }
    }
    const getShop = async () => {
        if (sid) {
            const thisShop = await shopClient.findShopById(sid.toString());
            setShop(thisShop);
        }
    }
    const addWishlist = async (productId: any) => {
        const wishlist = {
            productId: productId,
            buyerId: user._id
        }
        await wishlistClient.createWishlist(wishlist);
    }
    const editProduct = (productId: any) => {
        console.log(productId);
        redirect(`/shop/${sid}/product/${productId}`);
    }
    const createProduct = async () => {
        await productClient.createProduct({...product, shopId: shop._id});
        getProducts();
    }
    const deleteProduct = async (productId: any) => {
        await productClient.deleteProduct(productId);
        getProducts();
    } 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
        getProducts();
        getShop();
    }, []);
    return (
        <div id="agora-shop">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Shop: {shop.name}</h1> <hr/>
            <h3 className='text-primary'> Products</h3> <hr/>
            <Row xs={1} md={5} className="g-4">
            {products && products.map((product: any) => (
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
                        <Link href={`/shop/${product.shopId}`}>View Shop</Link> <br/>
                        {user.role === "BUYER" && 
                        <Button id='agora-add-wishlist-btn' className="btn-primary my-2 text-wrap" onClick={()=>addWishlist(product._id)}>
                            Add to Wishlist
                        </Button>
                        }
                        {user.role === "SELLER" && user._id === shop.sellerId &&
                        <div>
                            <Button id='agora-edit-product-button' className='btn-primary my-2 me-2 text-wrap'
                                onClick={()=>editProduct(product._id)}>
                                Edit Product
                            </Button>
                            <Button id='agora-edit-product-button' className='btn-danger my-2 me-2 text-wrap'
                                onClick={()=>deleteProduct(product._id)}>
                                Delete Product
                            </Button>
                        </div>
                        }
                        </CardBody>
                    </Card>
                </ListGroupItem>
            ))}
            </Row>
            {user.role === "SELLER" && user._id === shop.sellerId &&
            <div>
                <Card className='w-50 bg-secondary mt-3'>
                <FormControl id="agora-product-name" className="m-3 w-75"
                    defaultValue={product.name} placeholder='Name'
                    onChange={(e) => setProduct({ ...product, name: e.target.value }) } />
                <FormControl id="agora-password" className="m-3 w-75"
                    defaultValue={product.price} placeholder='Price'
                    onChange={(e) => setProduct({ ...product, price: e.target.value }) } />
                <FormControl id="agora-firstname" className="m-3 w-75"
                    defaultValue={product.description} placeholder='Product Description'
                    onChange={(e) => setProduct({ ...product, description: e.target.value }) } />
                <Button id='add-product-button' className='btn-primary m-3' onClick={()=>createProduct()}>
                    Add New Product
                </Button>
                </Card>
            </div>
            }
        </div>
    )
}