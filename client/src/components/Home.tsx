import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBView,
  MDBCardImage,
  MDBCardText,
} from 'mdbreact';
import Card from './Card';
import Loader from './Loader';
import { ResponseDataProduct } from './product/types';
import useRequest from '../hooks/user-request';

const cardTitle = (product: ResponseDataProduct) => {
  return (
    <>
      <Link to={`/products/view/${product.id}`}>
        <span>{product.name}</span>
      </Link>
    </>
  );
};

const cardImage = (srcImg: string) => (
  <MDBView hover zoom>
    <MDBCardImage
      alt="MDBCard image cap"
      top
      overlay="white-slight"
      src={srcImg}
      cascade
    />
  </MDBView>
);

const renderCard = (product: ResponseDataProduct[]) =>
  product.map((p) => {
    return (
      <MDBCol sm="4" key={p.id}>
        <Card
          cardImage={cardImage(p.imageUrl)}
          customText={<MDBCardText>Price Q {p.price}</MDBCardText>}
          cardTitle={cardTitle(p)}
        />
      </MDBCol>
    );
  });

const renderHome = (products: ResponseDataProduct[]) => {
  let tempArrayProducts = _.chunk(products, 3);
  return tempArrayProducts.map((product, index) => {
    return (
      <MDBRow style={{ padding: '25px 25px 25px 25px' }} key={index}>
        {renderCard(product)}
      </MDBRow>
    );
  });
};

const Home = () => {
  const { doRequest, resposeData: products } = useRequest<
    ResponseDataProduct[]
  >({
    url: '/api/product',
    method: 'get',
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  if (!products) {
    return <Loader />;
  }

  return <MDBContainer>{renderHome(products)}</MDBContainer>;
};

export default Home;
