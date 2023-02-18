export default () => {
  const postTweet = (formData) => {
    const form = new FormData();

    if (formData.text === "") {
      return alert("Text is empty");
    }

    form.append("text", formData.text);

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  return {
    postTweet,
  };
};
