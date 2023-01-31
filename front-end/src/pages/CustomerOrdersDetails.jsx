import { useParams } from 'react-router-dom';

function OrdersDetails() {
  const { id } = useParams();
  return (
    <div>
      <p>Orders Details</p>
      {id}
    </div>
  );
}

export default OrdersDetails;
