const API_URL = "https://marks-hotel-backend.onrender.com//gust/review/";
const authToken = localStorage.getItem("authToken");
const userId = localStorage.getItem("user_id");

function openAddReviewModal() {
    document.getElementById("reviewForm").reset();
    document.getElementById("review-id").value = "";
    document.getElementById("reviewModalLabel").textContent = "Add Review";
}

function openEditReviewModal(id, body, rating) {
    document.getElementById("review-id").value = id;
    document.getElementById("review-body").value = body;
    document.getElementById("review-rating").value = rating;
    document.getElementById("reviewModalLabel").textContent = "Edit Review";
    const modal = new bootstrap.Modal(document.getElementById("reviewModal"));
    modal.show();
}

async function fetchReviews() {
    document.getElementById("loader").style.display = "block"; // Show loader
    const response = await fetch(API_URL);
    const reviews = await response.json();
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
    document.getElementById("loader").style.display = "none"; // Hide loader
    reviews.forEach((review) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "list-group-item";

        let actionButtons = "";
        if (review.reviewer === parseInt(userId)) {
            actionButtons = `
    <div>
      <button class="btn btn-warning btn-sm" onclick="openEditReviewModal(${review.id}, \`${review.body}\`, '${review.rating}')">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id})">Delete</button>
    </div>
  `;
        }

        reviewItem.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <h5>${review.reviewer_name}</h5>
    <small>${review.created}</small>
  </div>
  <p class="">${review.body}</p>
  <p class=""><strong>Rating:</strong> ${review.rating}</p>
  ${actionButtons}
`;
        reviewList.appendChild(reviewItem);
    });
}

document.getElementById("reviewForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const reviewId = document.getElementById("review-id").value;
    const body = document.getElementById("review-body").value;
    const rating = document.getElementById("review-rating").value;

    const method = reviewId ? "PUT" : "POST";
    const url = reviewId ? `${API_URL}${reviewId}/` : API_URL;

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${authToken}`
        },
        body: JSON.stringify({ body, rating, reviewer: userId })
    });

    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'submitted!',
            text: 'Review submitted successfully!',
            timer: 2000,
            showConfirmButton: false
        });
        fetchReviews();
        const modal = bootstrap.Modal.getInstance(document.getElementById("reviewModal"));
        modal.hide();
    } else {
        alert("Something went wrong!");
    }
});

async function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${authToken}`
        }
    });

    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Review deleted successfully!',
            timer: 2000,
            showConfirmButton: false
        });
        fetchReviews();
    } else {
        alert("Failed to delete review.");
    }
}

document.addEventListener("DOMContentLoaded", fetchReviews);