import { authOptions } from "@/libs/authOptions"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import BookingForm from "@/components/BookingForm"

export default async function BookingPage() {

  const session = await getServerSession(authOptions)

  if (!session || !(session.user as any)?.token) {
    return (
      <main className="flex flex-col items-center p-10 min-h-screen bg-gray-50">
        <div className="mb-6 text-gray-500">
          Please <a href="/api/auth/signin" className="text-cyan-600 underline">sign in</a> to book a venue.
        </div>
        <BookingForm />
      </main>
    )
  }

  const profile = await getUserProfile((session.user as any).token)
  const createdAt = new Date(profile.data.createdAt)

  return (
    <main className="flex flex-col items-center p-10 min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-2xl font-semibold mb-4">{profile.data.name}</div>
        <table className="table-auto border-separate border-spacing-2 w-full">
          <tbody>
            <tr>
              <td className="font-medium text-gray-500 pr-4">Email</td>
              <td>{profile.data.email}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-500 pr-4">Tel.</td>
              <td>{profile.data.tel}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-500 pr-4">Member Since</td>
              <td>{createdAt.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BookingForm userName={profile.data.name} />

    </main>
  )
}