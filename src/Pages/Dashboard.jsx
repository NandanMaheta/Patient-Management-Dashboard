import { useState } from "react"; // State for handling modal control
import { useQuery } from "@tanstack/react-query"; // React Query for API fetching
import { useAuth } from "@/context/AuthContext"; // Authentication context
import { fetchPatients } from "@/services/api"; // API call

// Import ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

function Dashboard() {
  const { isLoggedin, user, login, logout } = useAuth(); // Authentication state
  const [selectedPatient, setSelectedPatient] = useState(null); // Stores the selected patient for the modal

  // Fetching patient data using React Query
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Navbar Section */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6 bg-blue-600 text-white p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">🏥 Healthcare Dashboard</h1>
        {isLoggedin ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">Welcome, {user?.name}!</span>
            <Button variant="destructive" className="cursor-pointer" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button variant="primary" className="px-6 py-3 text-lg font-semibold cursor-pointer" onClick={() => login({ name: "Dr. Alice" })}>
            Login
          </Button>
        )}
      </header>

      {/* Patient List Section */}
      {isLoggedin ? (
        <>
          {isLoading && <p className="text-gray-700 text-lg">Loading patients...</p>}
          {error && <p className="text-red-500 text-lg">Error loading data.</p>}
          {patients && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {patients.map((patient) => (
                <Card key={patient.id} className="p-6 border shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{patient.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">📧 <strong>Email:</strong> {patient.email}</p>
                    <p className="text-gray-700">📞 <strong>Phone:</strong> {patient.phone}</p>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          onClick={() => setSelectedPatient(patient)}
                          className="cursor-pointer"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedPatient && (
                        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Patient Details</DialogTitle>
                          </DialogHeader>
                          <div className="p-4 text-gray-700 space-y-2">
                            <p><strong>Name:</strong> {selectedPatient.name}</p>
                            <p><strong>Email:</strong> {selectedPatient.email}</p>
                            <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                          </div>
                          <DialogFooter>
                            <Button className="cursor-pointer" onClick={() => setSelectedPatient(null)}>Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">Please login to view patient data.</p>
      )}
    </div>
  );
}

export default Dashboard;
