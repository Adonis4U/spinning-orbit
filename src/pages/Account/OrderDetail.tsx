// Order Detail Page Placeholder
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function OrderDetail() {
    const { orderId } = useParams();

    return (
        <>
            <Helmet>
                <title>Order #{orderId} | House of Venus</title>
            </Helmet>
            <div className="container section">
                <h1>Order #{orderId}</h1>
                <p>Order details and tracking.</p>
            </div>
        </>
    );
}
