import { NextResponse } from "next/server";

const query = (username: string) => {
  return `  
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
              weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        
        }
      }
    }
    `;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;
    if (typeof username !== "string") {
      throw new Error("username is required");
    }

    const data = await fetch(`https://api.github.com/graphql`, {
      method: "post",
      body: JSON.stringify({ query: query(username) }),
      headers: {
        Authorization: `Bearer ${process.env.REMOTION_GITHUB_TOKEN}`,
        "content-type": "application/json",
      },
    });
    const json = await data.json();

    return NextResponse.json({ data: json.data });
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
