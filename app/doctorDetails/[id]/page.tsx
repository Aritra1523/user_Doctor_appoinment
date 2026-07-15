import DoctorDetails from "@/components/doctorDetails/DoctorDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <DoctorDetails id={id} />;
}