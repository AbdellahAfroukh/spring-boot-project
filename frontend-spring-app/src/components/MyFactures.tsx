import { useEffect, useState } from "react";
import { Facture } from "../types/factures";
import { fetchfactures } from "../api/rentalService";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table support in jsPDF

function MyFactures() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const factures = await fetchfactures();
        setFactures(factures);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const downloadPdf = (facture: Facture) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("Invoice Details", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Rental #${facture.rental_id}`, 105, 30, { align: "center" });

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);
    const data = [
      ["Brand", facture.brand],
      ["Model", facture.model],
      ["Driven Distance", `${facture.km_driven} km`],
      ["Start Date", facture.start_date],
      ["End Date", facture.end_date],
      ["Owner", `${facture.owner_first_name} ${facture.owner_last_name}`],
      ["Total Price", `${facture.price} MAD`],
    ];

    (doc as any).autoTable({
      startY: 40,
      head: [["Field", "Value"]],
      body: data,
      theme: "striped",
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [33, 37, 41],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 10 },
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for using our service!",
      105,
      (doc as any).lastAutoTable.finalY + 10,
      {
        align: "center",
      }
    );
    doc.save(`facture_${facture.rental_id}.pdf`);
  };
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 text-center">My Invoices</h1>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                Brand
              </th>
              <th scope="col" className="text-center">
                Model
              </th>
              <th scope="col" className="text-center">
                Driven distance
              </th>
              <th scope="col" className="text-center">
                Start Date
              </th>
              <th scope="col" className="text-center">
                End Date
              </th>
              <th scope="col" className="text-center">
                Owner first name
              </th>
              <th scope="col" className="text-center">
                Owner last name
              </th>
              <th scope="col" className="text-center">
                Total price
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {factures.map((facture) => (
              <tr key={facture.rental_id} style={{ cursor: "pointer" }}>
                <td className="text-center">{facture.brand}</td>
                <td className="text-center">{facture.model}</td>
                <td className="text-center">{facture.km_driven}</td>
                <td className="text-center">{facture.start_date}</td>
                <td className="text-center">{facture.end_date}</td>
                <td className="text-center">{facture.owner_first_name}</td>
                <td className="text-center">{facture.owner_last_name}</td>
                <td className="text-center">{facture.price} MAD</td>
                <td className="text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => downloadPdf(facture)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyFactures;
