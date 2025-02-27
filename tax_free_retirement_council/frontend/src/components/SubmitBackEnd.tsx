import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;

  phoneNumber: string;

  // Test Answers
  retirementStatus: string;
  estimatedSavings: string;
  mainConcerns: string;
  age: string;
  state: string;
}

export const HandleSubmit = async (
  formData: FormData,
  setIsLoading: (loading: boolean) => void,
): Promise<boolean> => {
  // Prevents default form submission
  setIsLoading(true);

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,

    phoneNumber: formData.phoneNumber,

    // Test Answers
    retirementStatus: formData.retirementStatus,
    estimatedSavings: formData.estimatedSavings,
    mainConcerns: formData.mainConcerns,
    age: formData.age,
    state: formData.state,
  };

  try {
    const response = await fetch("https://backend.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setIsLoading(false);

      return true;
    } else {
      setIsLoading(false);

      console.error("Error Submitting data:", data);
      alert(
        "There was an error submitting your information. Please try again.",
      );
      return false;
    }
  } catch (error) {
    setIsLoading(false);

    console.error("Submission Error:", error);
    alert("Something went wrong. Please try again.");
    return false;
  }
};
