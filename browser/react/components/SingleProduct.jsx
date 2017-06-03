import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ProductSidebar from './ProductSidebar';
import ProductImagesContainer from '../containers/ProductImagesContainer';

export default function (props) {
  const changeDate = (dateStr) => dateStr.slice(0, 10).split('-').join('/');
  if (props.currentProduct) {
    const productReviews = props.currentProduct.reviews;
    return (
      <div className="sing-product-body">
        <div className="sing-product-container">
          <ProductImagesContainer
            images={props.currentProduct.images}
            handleMagnifyImages={props.handleMagnifyImages}
            />
          <ProductSidebar
            currentProduct={props.currentProduct}
            addToCartOnClick={props.addToCartOnClick}
            colorList={props.colorList}
            colorSelect={props.colorSelect}
            addQuantity={props.addQuantity}
            subtractQuantity={props.subtractQuantity}
            quantity={props.quantity}
            addAdjust={props.addAdjust}
            removeAdjust={props.removeAdjust}
            adjustments={props.adjustments}
            addSize={props.addSize}
            selectedColor={props.selectedColor}
          />
        </div>

        {/*product reviews
        <div className="reviews-container">
          <div className="reviews-title-header">
            <div className="reviews-header-box">
              <h3 className="reviews-title-heading">Reviews</h3>
            </div>
            <div className="reviews-header-box" style={{textAlign: 'right', alignSelf: 'center'}}>
              <span><a className="review-add-link" onClick={props.handleAddReviewOnClick}>Add a review!</a></span>
            </div>
          </div>
          {
            // Each individual review
            productReviews.length ? productReviews.map(review => {
              return (
                <div key={review.id} className="sing-review">
                  <h4>{review.title}</h4>
                  <StarRatingComponent name="boardgame-rating" starCount={5} value={review.rating} />
                  <h6>{changeDate(review.date)}</h6>
                  <p>{review.body}</p>
                </div>
              )
            }) : <h4 style={{marginTop: '20px', marginBottom: '2em'}}>This product currently has no reviews.</h4>
          }
        </div>
      */}
      </div>
    );
  } else {
    return <h6>Loading product...</h6>
  }
}
