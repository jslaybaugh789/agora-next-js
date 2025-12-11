/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";

export default function Search() {
    const [query, setQuery] = useState('');
    const search = () => {
        redirect(`/search/${query}`);
    }
    return (
        <div id="agora-search">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Search</h1> <hr/>
            <Form id='agora-search-form' className='d-flex'>
                <FormControl className='w-50' type='text' placeholder="Search for a product" defaultValue={query}
                    onChange={(e) => setQuery(e.target.value)}>
                </FormControl>
                <Button className='btn-primary m-3' onClick={() => search()}>
                    Search
                </Button>
            </Form>
            <hr/>
        </div>
    )
}