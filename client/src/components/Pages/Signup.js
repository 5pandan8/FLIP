import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div
      className="signUpContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: " 5.5% 12% 4% 12%",
        borderRadius: "2px",
        background: "#f6f6f6",
      }}
    >
      <Card
        style={{
          width: "100%",
          margin: "2% 10% 2% 10%",
          padding: "5%",
          border: "4px solid #0057ff",
        }}
      >
        <Card.Body>
          <div style={{ float: "left", width: "50%" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} style={{ margin: "2%" }}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
            <div
              className="w-100 text-center mt-2"
              style={{ color: "black", fontSize: "15px" }}
            >
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
          <div style={{ float: "right", width: "50%" }}>
            <img
              src="/images/Signup_1.png"
              alt="Book reading"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
