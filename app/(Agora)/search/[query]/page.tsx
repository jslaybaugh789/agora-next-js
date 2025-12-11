/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useParams } from "next/navigation";
import { GiGreekTemple } from "react-icons/gi";
import * as searchClient from './client';
import { useEffect, useState } from "react";
import { Card, CardTitle, ListGroupItem, Row } from "react-bootstrap";
import Link from "next/link";

export default function Search() {
    const { query } = useParams();
    const [results, setResults] = useState<any>([]);
    const fetchResults = async () => {
        const searchResults = await searchClient.searchYoutube({query: query});
        setResults(searchResults.items);
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchResults();
    }, []);
    return (
        <div id="agora-search">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Results for {query}</h1> <hr/>
            <Row xs={1} md={5} className="g-4">
                {results.map((result: any) => (
                    <ListGroupItem className="p-3 mb-5 me-3 fs-5 bg-dark text-primary" key={result.id.videoId}>
                        <Card className='p-3 bg-secondary'>
                        <CardTitle>{result.snippet.title}</CardTitle>
                        <Link href={`/details/${result.id.videoId}`}> More Details </Link>
                    </Card>
                    </ListGroupItem>
                ))}
            </Row>
        </div>
    )
}