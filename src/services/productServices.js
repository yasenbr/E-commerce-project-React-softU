import { db } from "../config/config"; // Assuming 'db' is your Firebase database instance
import { toast } from "react-toastify"; // Assuming you are using 'react-toastify' for displaying notifications

export const getProduct = (prevProducts, setStateCallback) => {
  db.collection("Products").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === "added") {
        prevProducts.push({
          ProductID: change.doc.id,
          ProductName: change.doc.data().ProductName,
          ProductPrice: change.doc.data().ProductPrice,
          ProductImage: change.doc.data().ProductImage,
          ProductDescription: change.doc.data().ProductDescription,
        });
      }
    });
    setStateCallback({
      products: prevProducts,
    });
  });
};
export const deleteElement = (id) => {
  return db
    .collection("Products")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      toast.success("Document successfully deleted!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      window.location.reload(true);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
