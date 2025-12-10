/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { RootState } from "@/app/(Agora)/store";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiGreekTemple } from "react-icons/gi";
import { useSelector } from "react-redux";
import * as productClient from './client';
import { Card, FormControl, Button } from "react-bootstrap";

export default function Product() {
    const [user, setUser] = useState<any>({});
    const { currentUser } = useSelector((state: RootState) => state.profilesReducer);
    const fetchProfile = () => {
        if (!currentUser) {
            redirect('/login')
        }
        if ((currentUser as any).role === "BUYER") {
            redirect("/home");
        }
        setUser(currentUser);
    };
    const { sid, pid } = useParams();
    const [product, setProduct] = useState<any>({});
    const getProduct = async () => {
        if (pid) {
            const thisProduct = await productClient.findProductById(pid.toString());
            setProduct(thisProduct);
        }
    }
    useEffect(() => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchProfile();
            getProduct();
        }, []);
    const cancel = () => {
        redirect(`/shop/${sid}`);
    }
    const updateProduct = async () => {
        await productClient.updateProduct(product);
        redirect(`/shop/${sid}`);
    }
    return (
        <div id="agora-product">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Product</h1> <hr/>
            {product && 
            <Card className='w-50 bg-secondary'>
                <FormControl id="agora-product-name" className="m-3 w-75"
                    defaultValue={product.name} placeholder='Name'
                    onChange={(e) => setProduct({ ...product, name: e.target.value }) } />
                <FormControl id="agora-password" className="m-3 w-75"
                    defaultValue={product.price} placeholder='Price'
                    onChange={(e) => setProduct({ ...product, price: e.target.value }) } />
                <FormControl id="agora-firstname" className="m-3 w-75"
                    defaultValue={product.description} placeholder='Product Description'
                    onChange={(e) => setProduct({ ...product, description: e.target.value }) } />
                <Button id='save-product-changes-btn' className='btn-primary m-3' onClick={()=>updateProduct()}>
                    Save Product Changes
                </Button>
                <Button id='cancel-product-changes-btn' className='btn-danger m-3' onClick={()=>cancel()}>
                    Cancel Changes
                </Button>
            </Card>
            }
        </div>
    )
}