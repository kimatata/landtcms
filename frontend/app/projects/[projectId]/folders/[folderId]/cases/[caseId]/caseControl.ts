import Config from "@/config/config";
const apiServer = Config.apiServer;

/**
 * fetch case
 */
async function fetchCase(caseId: number) {
  const url = `${apiServer}/cases?caseId=${caseId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

/**
 * create step
 */
async function fetchCreateStep(newStepNo: number, parentCaseId: number) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${apiServer}/steps?newStepNo=${newStepNo}&parentCaseId=${parentCaseId}`;

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

/**
 * delete step
 */
async function fetchDeleteStep(stepId: number, parentCaseId: number) {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${apiServer}/steps/${stepId}?parentCaseId=${parentCaseId}`;

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

/**
 * Update folder
 */
async function updateCase(updateCaseData: CaseType) {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateCaseData),
  };

  const url = `${apiServer}/cases/${updateCaseData.id}`;

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

/**
 * Upload attachments
 */
async function fetchCreateAttachments(caseId: number, files: File[]) {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const url = `${apiServer}/attachments?parentCaseId=${caseId}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

export { fetchCase, fetchCreateStep, fetchDeleteStep, updateCase, fetchCreateAttachments };
