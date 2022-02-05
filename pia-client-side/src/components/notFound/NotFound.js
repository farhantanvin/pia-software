import React from "react";

function NotFound() {
  return (
    <body class="error-page">
        <div class="main-wrapper" style={{height: '100vh'}}>
			<div class="error-box" style={{position: "absolute", top: "50%", left: "50%", marginRight: "-50%", padding: "0", transform: "translateY(-50%)", transform: "translateX(-50%)"}}>
				<h1>404</h1>
				<h3><i class="fa fa-warning"></i> Oops! Page not found!</h3>
				<p>The page you requested was not found.</p>
				<a href="index.html" class="btn btn-custom">Back to Home</a>
			</div>
        </div>	``
    </body>
  );
}

export default NotFound;
