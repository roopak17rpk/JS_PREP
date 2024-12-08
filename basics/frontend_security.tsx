import React from "react";
/**
 * 1. XSS (Cross-Site Scripting) Prevention
 */

interface UserInputProps {
  userContent: string;
}

// ❌ Vulnerable Code
const UnsafeComponent = (props: UserInputProps) => {
  const { userContent } = props;
  return <div dangerouslySetInnerHTML={{ __html: userContent }} />;
};

// ✅ Secure Code
const SafeComponent = (props: UserInputProps) => {
  const { userContent } = props;
  return <div>{userContent}</div>;
};

/**
 * 2. Content Security Policy (CSP)
 *
 */
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
   script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
   style-src 'self' 'unsafe-inline';"
></meta>;

/**
 * 3. Secure Data Storage
 */

interface StorageData {
  userData: string;
  sensitiveInfo: string;
}

// ✅ Secure storage utility
const SecureStorage = {
  setItem: (props: StorageData) => {
    const { userData, sensitiveInfo } = props;

    // Never store sensitive data in localStorage
    sessionStorage.setItem("tempData", sensitiveInfo);
    localStorage.setItem("userData", userData);

    console.log("userData", userData);
    console.log("sensitiveInfo", sensitiveInfo);
  },
};

/**
 * 4. API Security
 */

interface ApiConfig {
  endpoint: string;
  data: unknown;
}

const secureApiCall = (props: ApiConfig) => {
  const { endpoint, data } = props;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add CSRF token if your backend requires it
      "X-CSRF-Token":
        document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content") || "",
    },
    // Prevent credentials from being sent to other domains
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
};

/**
 * 5. Input Validation
 */

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const SecureForm = (props: FormProps) => {
  const { onSubmit } = props;

  const validateInput = (input: string) => {
    // Remove any potentially harmful characters
    const sanitizedInput = input.replace(/<[^>]*>/g, "");
    return sanitizedInput;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const sanitizedData = validateInput(formData.get("userInput") as string);

    console.log("sanitizedData", sanitizedData);
    onSubmit(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userInput" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

/**
 * 6. URL Parameter Sanitization
 */

interface UrlParams {
  url: string;
}

const sanitizeUrl = (props: UrlParams) => {
  const { url } = props;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "";
  }

  const sanitized = encodeURI(url);
  console.log("sanitized", sanitized);

  return sanitized;
};
