import streamlit as st
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
load_dotenv()

st.title("Image Display App")

# File uploader widget
first = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="first")

if first is not None:
    # Display the image
    st.image(first, caption="Uploaded Image")
    # print(uploaded_file.getvalue()) 


sec = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="second")

if sec is not None:
    # Display the image
    st.image(sec, caption="Uploaded Image")
    # print(uploaded_file.getvalue()) 


third = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="third")

if third is not None:
    # Display the image
    st.image(third, caption="Uploaded Image")
    # print(uploaded_file.getvalue()) 


if first is not None and sec is not None and third is not None:
    st.success("All three images have been uploaded successfully!")

    # Show button and wait for click
    if st.button("Upload", key="upload_button"):
        # Initialize Gemini client
        client = genai.Client(api_key=os.getenv("GEMINI_API"))
        

        # Generate response for the first image
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=first.getvalue(),
                    mime_type=first.type,
                ),
                "explain that image"
            ]
        )

        # Display response
        st.write(response.text)