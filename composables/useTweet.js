export default () => {
  const postTweet = (formData) => {
    const form = new FormData();

    if (formData.text === "") {
      return alert("Text is empty");
    }

    form.append("text", formData.text);

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append('media_file_' + index, mediaFile)
    })

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  return {
    postTweet,
  };
};
