import { useState } from "react"; // React state for modal control
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching
import { useAuth } from "@/context/AuthContext"; // Authentication context
import { fetchPatients } from "@/services/api"; // API call

// Import ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

function Dashboard() {
  const { isLoggedin, user, login, logout } = useAuth(); // Access authentication context
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient for modal

  // Fetch patient data using React Query
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar Section */}
      <header className="flex justify-between items-center mb-6 bg-blue-500 text-white p-4 rounded-md">
        <h1 className="text-xl font-bold">Healthcare Dashboard</h1>
        {isLoggedin ? (
          <div className="flex items-center gap-3">
            <span>Welcome, {user?.name}!</span>
            <Button variant="destructive" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => login({ name: "Dr. Alice" })}>Login</Button>
        )}
      </header>

      {/* Patient List Section */}
      {isLoggedin ? (
        <>
          {isLoading && <p>Loading patients...</p>}
          {error && <p>Error loading data.</p>}
          {patients && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <Card key={patient.id} className="p-4 border">
                  <CardHeader>
                    <CardTitle>{patient.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Email: {patient.email}</p>
                    <p>Phone: {patient.phone}</p>
                  </CardContent>
                  <CardFooter>
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">View Details</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Patient Details</DialogTitle>
      </DialogHeader>
      {selectedPatient && (
        <div>
          <p><strong>Name:</strong> {selectedPatient.name}</p>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          <p><strong>Phone:</strong> {selectedPatient.phone}</p>
        </div>
      )}
      <DialogFooter>
        <Button onClick={() => setSelectedPatient(null)}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</CardFooter>

                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Please login to view patient data.</p>
      )}

      {/* Patient Details Dialog (Modal) */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Email:</strong> {selectedPatient.email}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedPatient(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
