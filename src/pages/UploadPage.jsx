// import { useState } from "react";
// import axios from "axios";

// function UploadPage() {

//   const [sellerFile, setSellerFile] = useState(null);
//   const [receiverFile, setReceiverFile] = useState(null);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState([]);

  
//   const handleUpload = async () => {

//     if (!sellerFile || !receiverFile) {
//       setMessage("⚠ Please select both files");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("sellerFile", sellerFile);
//     formData.append("receiverFile", receiverFile);

//     try {
//       setLoading(true);
//       setMessage("");

//       const res = await axios.post(
//         "http://localhost:9090/api/v1/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(res.data.message || "Upload successful");

//       // If backend sends comparison results later
//       if (res.data.results) {
//         setResults(res.data.results);
//       }

//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Upload failed. Check backend.");

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* INNER CONTENT WRAPPER: Centers layout elements inside the full-screen black canvas */}
//       <div style={styles.contentWrapper}>
        
//         {/* LOCAL HEADER IMAGE FROM PUBLIC FOLDER */}
//         <div style={styles.imageContainer}>
//           <img 
//             src="/images/banner.png" 
//             alt="RecoBot Banner" 
//             style={styles.headerImage}
//           />
//         </div>

//         {/* HEADER */}
//         <h2 style={styles.title}>📊 RecoBot - Invoice Reconciliation</h2>

//         {/* UPLOAD CARD */}
//         <div style={styles.card}>

//           {/* Seller File */}
//           <div style={styles.inputBox}>
//             <label style={styles.label}>Seller Party</label>
//             <input
//               type="file"
//               accept=".xlsx,.csv,.pdf"
//               onChange={(e) => setSellerFile(e.target.files[0])}
//               style={styles.fileInput}
//             />
//           </div>

//           {/* Receiver File */}
//           <div style={styles.inputBox}>
//             <label style={styles.label}>Purchaser Party</label>
//             <input
//               type="file"
//               accept=".xlsx,.csv,.pdf"
//               onChange={(e) => setReceiverFile(e.target.files[0])}
//               style={styles.fileInput}
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             style={{
//               ...styles.button,
//               backgroundColor: loading ? "#555" : "#2563eb",
//               cursor: loading ? "not-allowed" : "pointer"
//             }}
//           >
//             {loading ? "Processing..." : "Upload & Compare"}
//           </button>

//           {/* MESSAGE */}
//           {message && <p style={styles.message}>{message}</p>}

//           {/* DOWNLOAD BUTTONS */}
//           {results.length > 0 && (
//             <div style={styles.downloadBox}>

//               <button
//                 style={styles.downloadBtn}
//                 onClick={() =>
//                   window.open("http://localhost:9090/api/v1/download/excel")
//                 }
//               >
//                 📥 Download Excel
//               </button>

//               <button
//                 style={styles.downloadBtnPdf}
//                 onClick={() =>
//                   window.open("http://localhost:9090/api/v1/download/pdf")
//                 }
//               >
//                 📄 Download PDF
//               </button>

//             </div>
//           )}

//         </div>

//         {/* RESULTS TABLE */}
//         {results.length > 0 && (
//           <div style={styles.tableCard}>

//             <div style={styles.tableHeaderSection}>
//               <h3 style={{ color: "#ffffff", margin: 0 }}>📑 Reconciliation Results</h3>
//               <span style={styles.recordCount}>{results.length} Records Found</span>
//             </div>

//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>

//                 <thead>
//                   <tr style={styles.thRow}>
//                     <th style={styles.th}>Invoice No.</th>
//                     <th style={{ ...styles.th, ...styles.sellerHeader }}>Seller Amt</th>
//                     <th style={{ ...styles.th, ...styles.purchaserHeader }}>Purchaser Amt</th>
//                     <th style={{ ...styles.th, ...styles.sellerHeader }}>Seller Date</th>
//                     <th style={{ ...styles.th, ...styles.purchaserHeader }}>Purchaser Date</th>
//                     <th style={{ ...styles.th, textAlign: "center" }}>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {results.map((item, index) => {
//                     const isMatch = item.status === "MATCH";
                    
//                     // Determine baseline color depending on row status
//                     let rowBgColor = index % 2 === 0 ? "#161616" : "#1c1c1c";
//                     if (!isMatch) {
//                       rowBgColor = "rgba(239, 68, 68, 0.08)"; // Subtle deep red highlight for mismatch anomalies
//                     }

//                     return (
//                       <tr 
//                         key={index} 
//                         style={{
//                           ...styles.tr,
//                           backgroundColor: rowBgColor,
//                           borderBottom: isMatch ? "1px solid #222" : "1px solid rgba(239, 68, 68, 0.2)"
//                         }}
//                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isMatch ? "#242424" : "rgba(239, 68, 68, 0.15)"}
//                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = rowBgColor}
//                       >
//                         <td style={{ ...styles.td, fontWeight: "bold", color: isMatch ? "#ffffff" : "#f87171" }}>
//                           {item.invoiceNo || "N/A"}
//                         </td>
//                         <td style={styles.td}>
//                           {item.sellerAmount != null ? `₹${Number(item.sellerAmount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—"}
//                         </td>
//                         <td style={styles.td}>
//                           {item.purchaserAmount != null ? `₹${Number(item.purchaserAmount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—"}
//                         </td>
//                         <td style={{ ...styles.td, color: "#9ca3af" }}>
//                           {item.sellerDate || "—"}
//                         </td>
//                         <td style={{ ...styles.td, color: "#9ca3af" }}>
//                           {item.purchaserDate || "—"}
//                         </td>
//                         <td style={{ ...styles.td, textAlign: "center" }}>
//                           <span style={{
//                             ...styles.statusBadge,
//                             backgroundColor: isMatch ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
//                             color: isMatch ? "#4ade80" : "#f87171",
//                             border: isMatch ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
//                           }}>
//                             {item.status}
//                           </span>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>

//               </table>
//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default UploadPage;


// const styles = {

//   container: {
//     backgroundColor: "#000000", 
//     color: "#ffffff",           
//     minHeight: "100vh",         
//     width: "100vw",             
//     margin: 0,
//     padding: "40px 20px",
//     boxSizing: "border-box",
//     fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"        
//   },

//   contentWrapper: {
//     width: "100%",
//     maxWidth: "950px"           
//   },

//   imageContainer: {
//     width: "100%",
//     borderRadius: "12px",
//     overflow: "hidden",
//     marginBottom: "24px",
//     border: "1px solid #222"
//   },

//   headerImage: {
//     width: "100%",
//     height: "180px",
//     objectFit: "cover",
//     display: "block"
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: "24px",
//     color: "#ffffff",
//     fontWeight: "700"
//   },

//   card: {
//     background: "#121212",      
//     padding: "24px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//     border: "1px solid #222"
//   },

//   inputBox: {
//     marginBottom: "20px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px"
//   },

//   label: {
//     fontWeight: "600",
//     color: "#9ca3af",
//     fontSize: "14px"
//   },

//   fileInput: {
//     color: "#e5e7eb",
//     backgroundColor: "#1c1c1e",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #2c2c2e",
//     fontSize: "14px"
//   },

//   button: {
//     width: "100%",
//     padding: "14px",
//     border: "none",
//     color: "white",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     marginTop: "10px",
//     transition: "background-color 0.2s ease"
//   },

//   message: {
//     marginTop: "16px",
//     fontWeight: "500",
//     textAlign: "center",
//     fontSize: "14px"
//   },

//   downloadBox: {
//     marginTop: "24px",
//     display: "flex",
//     gap: "12px",
//     flexWrap: "wrap"
//   },

//   downloadBtn: {
//     flex: 1,
//     padding: "12px",
//     border: "none",
//     background: "#166534",
//     color: "white",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px"
//   },

//   downloadBtnPdf: {
//     flex: 1,
//     padding: "12px",
//     border: "none",
//     background: "#991b1b",
//     color: "white",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px"
//   },

//   /* MODERNIZED TABLE COMPONENTS */
//   tableCard: {
//     marginTop: "32px",
//     padding: "24px",
//     background: "#121212",
//     borderRadius: "12px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//     border: "1px solid #222"
//   },

//   tableHeaderSection: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px"
//   },

//   recordCount: {
//     fontSize: "13px",
//     color: "#6b7280",
//     background: "#1c1c1e",
//     padding: "4px 10px",
//     borderRadius: "20px",
//     border: "1px solid #2c2c2e"
//   },

//   tableWrapper: {
//     overflowX: "auto",
//     borderRadius: "8px",
//     border: "1px solid #222"
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "750px",
//     fontSize: "14px"
//   },

//   thRow: {
//     background: "#1c1c1e",
//     borderBottom: "2px solid #2c2c2e"
//   },

//   th: {
//     padding: "14px 16px",
//     textAlign: "left",
//     color: "#e5e7eb",
//     fontWeight: "600",
//     fontSize: "13px",
//     letterSpacing: "0.5px"
//   },

//   sellerHeader: {
//     borderLeft: "2px solid rgba(255,255,255,0.03)"
//   },

//   purchaserHeader: {
//     borderLeft: "2px solid rgba(0,0,0,0.15)"
//   },

//   tr: {
//     transition: "background-color 0.15s ease"
//   },

//   td: {
//     padding: "14px 16px",
//     color: "#d1d5db",
//     verticalAlign: "middle"
//   },

//   statusBadge: {
//     display: "inline-block",
//     padding: "4px 12px",
//     borderRadius: "6px",
//     fontSize: "12px",
//     fontWeight: "700",
//     letterSpacing: "0.5px",
//     textAlign: "center",
//     minWidth: "75px"
//   }
// }; 




import { useState } from "react";
import axios from "react";

function UploadPage() {

  const [sellerFile, setSellerFile] = useState(null);
  const [receiverFile, setReceiverFile] = useState(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  
  const handleUpload = async () => {

    if (!sellerFile || !receiverFile) {
      setMessage("⚠ Please select both files");
      return;
    }

    const formData = new FormData();
    formData.append("sellerFile", sellerFile);
    formData.append("receiverFile", receiverFile);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        "https://recobot-backend.onrender.com/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Upload successful");

      // If backend sends comparison results later
      if (res.data.results) {
        setResults(res.data.results);
      }

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Check backend.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* INNER CONTENT WRAPPER: Centers layout elements inside the full-screen black canvas */}
      <div style={styles.contentWrapper}>
        
        {/* LOCAL HEADER IMAGE FROM PUBLIC FOLDER */}
        <div style={styles.imageContainer}>
          <img 
            src="/images/banner.png" 
            alt="RecoBot Banner" 
            style={styles.headerImage}
          />
        </div>

        {/* HEADER */}
        <h2 style={styles.title}>📊 RecoBot - Invoice Reconciliation</h2>

        {/* UPLOAD CARD */}
        <div style={styles.card}>

          {/* Seller File */}
          <div style={styles.inputBox}>
            <label style={styles.label}>Seller Party</label>
            <input
              type="file"
              accept=".xlsx,.csv,.pdf"
              onChange={(e) => setSellerFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          {/* Receiver File */}
          <div style={styles.inputBox}>
            <label style={styles.label}>Purchaser Party</label>
            <input
              type="file"
              accept=".xlsx,.csv,.pdf"
              onChange={(e) => setReceiverFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#555" : "#2563eb",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Processing..." : "Upload & Compare"}
          </button>

          {/* MESSAGE */}
          {message && <p style={styles.message}>{message}</p>}

          {/* DOWNLOAD BUTTONS */}
          {results.length > 0 && (
            <div style={styles.downloadBox}>

              <button
                style={styles.downloadBtn}
                onClick={() =>
                  window.open("https://recobot-backend.onrender.com/api/v1/download/excel")
                }
              >
                📥 Download Excel
              </button>

              <button
                style={styles.downloadBtnPdf}
                onClick={() =>
                  window.open("https://recobot-backend.onrender.com/api/v1/download/pdf")
                }
              >
                📄 Download PDF
              </button>

            </div>
          )}

        </div>

        {/* RESULTS TABLE */}
        {results.length > 0 && (
          <div style={styles.tableCard}>

            <div style={styles.tableHeaderSection}>
              <h3 style={{ color: "#ffffff", margin: 0 }}>📑 Reconciliation Results</h3>
              <span style={styles.recordCount}>{results.length} Records Found</span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>

                <thead>
                  <tr style={styles.thRow}>
                    <th style={styles.th}>Invoice No.</th>
                    <th style={{ ...styles.th, ...styles.sellerHeader }}>Seller Amt</th>
                    <th style={{ ...styles.th, ...styles.purchaserHeader }}>Purchaser Amt</th>
                    <th style={{ ...styles.th, ...styles.sellerHeader }}>Seller Date</th>
                    <th style={{ ...styles.th, ...styles.purchaserHeader }}>Purchaser Date</th>
                    <th style={{ ...styles.th, textAlign: "center" }}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((item, index) => {
                    const isMatch = item.status === "MATCH";
                    
                    // Determine baseline color depending on row status
                    let rowBgColor = index % 2 === 0 ? "#161616" : "#1c1c1c";
                    if (!isMatch) {
                      rowBgColor = "rgba(239, 68, 68, 0.08)"; // Subtle deep red highlight for mismatch anomalies
                    }

                    return (
                      <tr 
                        key={index} 
                        style={{
                          ...styles.tr,
                          backgroundColor: rowBgColor,
                          borderBottom: isMatch ? "1px solid #222" : "1px solid rgba(239, 68, 68, 0.2)"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isMatch ? "#242424" : "rgba(239, 68, 68, 0.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = rowBgColor}
                      >
                        <td style={{ ...styles.td, fontWeight: "bold", color: isMatch ? "#ffffff" : "#f87171" }}>
                          {item.invoiceNo || "N/A"}
                        </td>
                        <td style={styles.td}>
                          {item.sellerAmount != null ? `₹${Number(item.sellerAmount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—"}
                        </td>
                        <td style={styles.td}>
                          {item.purchaserAmount != null ? `₹${Number(item.purchaserAmount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—"}
                        </td>
                        <td style={{ ...styles.td, color: "#9ca3af" }}>
                          {item.sellerDate || "—"}
                        </td>
                        <td style={{ ...styles.td, color: "#9ca3af" }}>
                          {item.purchaserDate || "—"}
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: isMatch ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: isMatch ? "#4ade80" : "#f87171",
                            border: isMatch ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default UploadPage;


const styles = {

  container: {
    backgroundColor: "#000000", 
    color: "#ffffff",          
    minHeight: "100vh",         
    width: "100vw",             
    margin: 0,
    padding: "40px 20px",
    boxSizing: "border-box",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"        
  },

  contentWrapper: {
    width: "100%",
    maxWidth: "950px"          
  },

  imageContainer: {
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "24px",
    border: "1px solid #222"
  },

  headerImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block"
  },

  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#ffffff",
    fontWeight: "700"
  },

  card: {
    background: "#121212",      
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "1px solid #222"
  },

  inputBox: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  label: {
    fontWeight: "600",
    color: "#9ca3af",
    fontSize: "14px"
  },

  fileInput: {
    color: "#e5e7eb",
    backgroundColor: "#1c1c1e",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #2c2c2e",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background-color 0.2s ease"
  },

  message: {
    marginTop: "16px",
    fontWeight: "500",
    textAlign: "center",
    fontSize: "14px"
  },

  downloadBox: {
    marginTop: "24px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },

  downloadBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    background: "#166534",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },

  downloadBtnPdf: {
    flex: 1,
    padding: "12px",
    border: "none",
    background: "#991b1b",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },

  /* MODERNIZED TABLE COMPONENTS */
  tableCard: {
    marginTop: "32px",
    padding: "24px",
    background: "#121212",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "1px solid #222"
  },

  tableHeaderSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  recordCount: {
    fontSize: "13px",
    color: "#6b7280",
    background: "#1c1c1e",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #2c2c2e"
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "8px",
    border: "1px solid #222"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "750px",
    fontSize: "14px"
  },

  thRow: {
    background: "#1c1c1e",
    borderBottom: "2px solid #2c2c2e"
  },

  th: {
    padding: "14px 16px",
    textAlign: "left",
    color: "#e5e7eb",
    fontWeight: "600",
    fontSize: "13px",
    letterSpacing: "0.5px"
  },

  sellerHeader: {
    borderLeft: "2px solid rgba(255,255,255,0.03)"
  },

  purchaserHeader: {
    borderLeft: "2px solid rgba(0,0,0,0.15)"
  },

  tr: {
    transition: "background-color 0.15s ease"
  },

  td: {
    padding: "14px 16px",
    color: "#d1d5db",
    verticalAlign: "middle"
  },

  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textAlign: "center",
    minWidth: "75px"
  }
};