import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  updateDoc,
  doc,
  getDocs,
  runTransaction,
  orderBy,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAGElOdWidxia5AqmhMkUs-Fw7VxzUPxdI",
  authDomain: "blogoasis-e036d.firebaseapp.com",
  databaseURL: "https://blogoasis-e036d-default-rtdb.firebaseio.com",
  projectId: "blogoasis-e036d",
  storageBucket: "blogoasis-e036d.appspot.com",
  messagingSenderId: "478529765087",
  appId: "1:478529765087:web:970a7648a2ddd288e6f36a",
  measurementId: "G-L2VWGCMLW3",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestoreInstance = getFirestore(firebaseApp);
const storageInstance = getStorage();
const GoogleAuth = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  let [userinfo, setuserinfo] = useState();
  let [userallData, setuserallData] = useState({
    userID: "",
    name: "",
    username: "",
    email: "",
    imageURL: "",
    aboutmyself: "",
  });
  let [loading, setloading] = useState(true);

  // This is to see the orginal value of userallData after it get seetted up via setuserallData but if you want to see it by simply outputing it to console when you setted up its value then you will not be able to do so as it will take some time so inorder to do that we use useEffect which will display change whenever our userallData changes.
  // useEffect(()=>{
  //   console.log(userallData);
  // },[userallData])

  const getUserDataFromFirestore = async (userEmail) => {
    try {
      const UserInfoFolderInstance = collection(firestoreInstance, "UserInfo");
      const q = query(UserInfoFolderInstance, where("email", "==", userEmail));

      const querysnap = await getDocs(q);

      querysnap.forEach((doc) => {
        let name = doc.data().name;
        let username = doc.data().username;
        let email = doc.data().email;
        let imageURL = doc.data().imageURL;
        let aboutmyself = doc.data().aboutmyself;
        let userID = doc.id;
        setuserallData({
          userID,
          name,
          username,
          email,
          imageURL,
          aboutmyself,
        });
      });
    } catch (err) {
      console.log("Error while getting user data using Email", err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setuserinfo(user);
        const tempfunction = async () =>
          await getUserDataFromFirestore(user.email);
        tempfunction();
        setloading(false);
      } else {
        setuserinfo(null);
        setuserallData({
          userID: "",
          name: "",
          username: "",
          email: "",
          imageURL: "",
        });
        setloading(false);
      }
    });
  }, []);

  const signUpuserWithEmailAndPassword = async (email, password) =>
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  const savingUserDetails = async (
    email,
    name,
    username,
    userPhoto,
    aboutmyself
  ) => {
    try {
      const ImageRef = ref(
        storageInstance,
        `uploads/images/${Date.now()}-${userPhoto.name}`
      );
      const uploadresult = await uploadBytes(ImageRef, userPhoto);
      await addDoc(collection(firestoreInstance, "UserInfo"), {
        email,
        name,
        username,
        imageURL: uploadresult.ref.fullPath,
        aboutmyself,
      });
    } catch (err) {
      console.log("Error while adding user Detail during Sign up", err);
    }
  };
  const addingFeed = async (name, email, Feedback) => {
    try {
      await addDoc(collection(firestoreInstance, "Feedbacks"), {
        name,
        email,
        Feedback,
      });
    } catch (err) {
      console.log("Erro while adding Feed", err);
    }
  };
  const addingBlog = async (
    category,
    tittle,
    description,
    Like,
    Dislike,
    Helpful,
    author,
    authoremail,
    dateOfPublish
  ) => {
    try {
      await addDoc(collection(firestoreInstance, "BlogsWritten"), {
        category,
        tittle,
        description,
        Like,
        Dislike,
        Helpful,
        author,
        authoremail,
        dateOfPublish,
      });
    } catch (err) {
      console.log("Error while adding Blog", err);
    }
  };
  const getAllBlogs = () => {
    return getDocs(collection(firestoreInstance, "BlogsWritten"));
  };

  const getBlogWithId = async (blogid) => {
    try {
      const docref = doc(firestoreInstance, "BlogsWritten", blogid);
      const blogsnap = await getDoc(docref);
      return blogsnap.data();
    } catch (err) {
      console.log("Error While getting blog with ID", err);
    }
  };

  const updateBlogWithId = async (blogid, newcat, newtittle, newcontent) => {
    try {
      const docref = doc(firestoreInstance, "BlogsWritten", blogid);
      await updateDoc(docref, {
        category: newcat,
        tittle: newtittle,
        description: newcontent,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const transactReactionToBlogs = async (blogid, userid, type) => {
    try {
      const docref = doc(firestoreInstance, "BlogsWritten", blogid);
      await runTransaction(firestoreInstance, async (transaction) => {
        const BlogDoc = await transaction.get(docref);

        if (!BlogDoc) {
          throw new Error("Post Data is not existing");
        }

        if (type === "like") {
          const AllLikes = BlogDoc.data().Like || [];

          if (AllLikes.includes(userid)) {
            // user already like the post so unlike it
            const updatedLikes = AllLikes.filter((id) => id !== userid);
            transaction.update(docref, { Like: updatedLikes });
          } else {
            // User has not liked the post, so like it
            transaction.update(docref, { Like: [...AllLikes, userid] });
          }
        } else if (type === "unlike") {
          const AllDislikes = BlogDoc.data().Dislike || [];

          if (AllDislikes.includes(userid)) {
            // user already Dislike the post so unDislike it
            const updatedDislikes = AllDislikes.filter((id) => id !== userid);
            transaction.update(docref, { Dislike: updatedDislikes });
          } else {
            // User has not Disliked the post, so Dislike it
            transaction.update(docref, { Dislike: [...AllDislikes, userid] });
          }
        } else if (type === "helpful") {
          const AllHelpfuls = BlogDoc.data().Helpful || [];

          if (AllHelpfuls.includes(userid)) {
            // user already Helpful the post so unHelpful it
            const updatedHelpfuls = AllHelpfuls.filter((id) => id !== userid);
            transaction.update(docref, { Helpful: updatedHelpfuls });
          } else {
            // User has not Helpfuld the post, so Helpful it
            transaction.update(docref, { Helpful: [...AllHelpfuls, userid] });
          }
        }
      });
    } catch (err) {
      console.log("here is the error", err);
    }
  };
  const getBlogsNameInOrder = async (ordertype) => {
    try {
      const UserInfoFolderInstance = collection(
        firestoreInstance,
        "BlogsWritten"
      );
      let resultarr = [];
      if (ordertype === "Recent") {
        const q = query(
          UserInfoFolderInstance,
          orderBy("dateOfPublish"),
          limit(5)
        );
        const querysnap = await getDocs(q);
        querysnap.forEach((doc) => {
          resultarr.push(doc.data().tittle);
        });
      } else if (ordertype === "Most Liked") {
        const q = query(
          UserInfoFolderInstance,
          orderBy("Like", "desc"),
          limit(5)
        );
        const querysnap = await getDocs(q);
        querysnap.forEach((doc) => {
          resultarr.push(doc.data().tittle);
        });
      } else {
        const q = query(
          UserInfoFolderInstance,
          orderBy("Helpful", "desc"),
          limit(5)
        );
        const querysnap = await getDocs(q);
        querysnap.forEach((doc) => {
          resultarr.push(doc.data().tittle);
        });
      }
      return resultarr;
    } catch (err) {
      console.log("Error is occured while getting name of Blogs in order", err);
    }
  };
  const loginUserWithEmailAndPassword = async (email, password) =>
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  const loginWithGoogle = async () =>
    await signInWithPopup(firebaseAuth, GoogleAuth);
  const getImageUrl = async (path) => {
    return getDownloadURL(ref(storageInstance, path));
  };
  const getUserDataFromFirestoreViaName = async (unname) => {
    try {
      const UserInfoFolderInstance = collection(firestoreInstance, "UserInfo");
      const q = query(UserInfoFolderInstance, where("username", "==", unname));
      const querysnap = await getDocs(q);
      let name, username, email, imageURL, aboutmyself, userID;
      querysnap.forEach((doc) => {
        name = doc.data().name;
        username = doc.data().username;
        email = doc.data().email;
        imageURL = doc.data().imageURL;
        aboutmyself = doc.data().aboutmyself;
        userID = doc.id;
      });
      return { userID, name, username, email, imageURL, aboutmyself };
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("Signed out successfully");
    } catch (err) {
      console.log("Error during Logout", err);
    }
  };
  let isLoggedin = userinfo ? true : false;

  const ContextValue = {
    signUpuserWithEmailAndPassword,
    savingUserDetails,
    addingBlog,
    loginUserWithEmailAndPassword,
    getAllBlogs,
    getImageUrl,
    getBlogWithId,
    getUserDataFromFirestore,
    getUserDataFromFirestoreViaName,
    getBlogsNameInOrder,
    addingFeed,
    transactReactionToBlogs,
    updateBlogWithId,
    loginWithGoogle,
    logOut,
    userallData,
    isLoggedin,
    loading,
  };
  return (
    <FirebaseContext.Provider value={ContextValue}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
