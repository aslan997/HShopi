import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div>
      <div class="reviews w-75">
        <h3>Other's Reviews:</h3>
        <hr />
        {reviews.map((review) => (
          <div class="review-card my-3" key={review._id}>
            <div class="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p class="review_user">{review.name}</p>
            <p class="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListReviews;
