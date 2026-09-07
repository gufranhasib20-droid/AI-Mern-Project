import React, { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(null); // holds the order being "paid"

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      amount: 100,
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      amount: 500,
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleProceedToPay = async (plan) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        ServerUrl + "/api/payment/create-order",
        { credits: plan.credits, amount: plan.amount },
        { withCredentials: true }
      );

      if (data.success) {
        setPaymentPopup(data.order); // show fake payment modal with this order
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while creating your order.");
    } finally {
      setLoading(false);
    }
  };

  const handleFakePaymentSuccess = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        ServerUrl + "/api/payment/verify-payment",
        { orderId: paymentPopup.id, credits: paymentPopup.credits },
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setUserData(data.user)); // update credits everywhere (navbar too)
        setPaymentPopup(null);
        setSelectedPlanId(null);
        alert(`Payment successful! You now have ${data.user.credits} credits.`);
      }
    } catch (error) {
      console.log(error);
      alert("Payment verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:py-16 sm:px-6">
      <div className="max-w-6xl mx-auto mb-10 sm:mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition shrink-0"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 mt-2 sm:mt-3 text-base sm:text-lg">
            Flexible pricing to match your interview preparation needs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isHighlighted = plan.badge || isSelected;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 border transition hover:-translate-y-1 hover:shadow-xl ${
                isHighlighted ? "border-emerald-500" : "border-gray-200"
              }`}
            >
              {plan.default && (
                <span className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                  Default
                </span>
              )}
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <div className="text-left pr-16">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {plan.name}
                </h2>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
                  {plan.description}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-emerald-600 font-semibold">
                  {plan.credits} Credits
                </p>
              </div>

              <div className="mt-6 space-y-3 sm:space-y-4">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm sm:text-base text-gray-600"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 shrink-0">
                      <FaCheck className="text-emerald-600 text-xs" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {!plan.default && (
                <button
                  disabled={loading}
                  onClick={() =>
                    isSelected
                      ? handleProceedToPay(plan)
                      : handleSelectPlan(plan.id)
                  }
                  className={`w-full mt-7 sm:mt-8 py-3 rounded-xl font-semibold transition ${
                    isSelected
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {loading ? "Please wait..." : isSelected ? "Proceed to Pay" : "Select Plan"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {paymentPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Payment</h2>
            <p className="text-gray-500 mb-4">Order ID: {paymentPopup.id}</p>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ₹{paymentPopup.amount / 100}
            </p>
            <button
              disabled={loading}
              onClick={handleFakePaymentSuccess}
              className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 mb-3"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
            <button
              onClick={() => setPaymentPopup(null)}
              className="w-full text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;