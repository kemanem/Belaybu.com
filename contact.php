<?php
// contact.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $subject_input = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate required fields
    if (empty($name) || empty($email) || empty($subject_input) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // Recipient email
    $to = "gogokema4@gmail.com";
    $subject = "New Contact Form Submission: " . ucfirst($subject_input);

    // Build email content
    $email_content = "
    <h2>New Message from Contact Form</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> " . ($phone ? $phone : 'Not provided') . "</p>
    <p><strong>Subject:</strong> $subject_input</p>
    <p><strong>Message:</strong><br>$message</p>
    ";

    // Set headers for HTML email
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success response
        http_response_code(200);
        echo "Thank you, $name! Your message has been sent successfully.";
    } else {
        // Failure
        http_response_code(500);
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
} else {
    // Invalid request
    http_response_code(403);
    echo "Access denied.";
}
?>