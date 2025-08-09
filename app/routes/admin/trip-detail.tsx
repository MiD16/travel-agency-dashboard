import type { LoaderFunctionArgs } from "react-router"
import { getTripByID } from "~/appwrite/trips";
import type { Route } from "./+types/trip-detail";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import Header from "components/Header";
import InfoPill from "components/InfoPill";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if (!tripId) {
        throw new Error('Trip ID is required')
    }

    return await getTripByID(tripId);
}

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const tripData = parseTripData(loaderData?.tripDetail);
    const imageURLs = loaderData?.imageUrls || [];
    const { name, duration, itinerary, travelStyle, groupType, budget, interests, description, bestTimeToVisit, weatherInfo, country, estimatedPrice } = tripData || {}

    const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !text-pink-500'},
        { text: groupType, bg: '!bg-primary-50 !text-primary-500'},
        { text: budget, bg: '!bg-success-50 !text-success-700'},
        { text: interests, bg: '!bg-navy-50 !text-navy-500'},
    ]
  return (
    <main className="travel-detail wrapper">
        <Header title="Trip Details" description="View and Edit AI-Generated travel plans" />
        <section className="container wrapper-md">
            <header>
                <h1 className="p-40-semibold text-dark-100">{name}</h1>
                <div className="items-center flex gap-5">
                    <InfoPill 
                        text={`${duration}-day plan`}
                        image='/assets/icons/calendar.svg'
                    />
                    <InfoPill 
                        text={itinerary?.slice(0, 2).map((item) => item.location).join(', ') || ''}
                        image='/assets/icons/location-mark.svg'
                    />
                </div>
            </header>

            <section className="gallery">
                {imageURLs.map((url: string, index: number) => (
                    <img src={url} key={index} alt={index.toString()} className={cn('w-full rounded-xl object-cover', index === 0 ? 'md:col-span-2 md:row-span-2 h-[330px]' : 'md:row-span-1 h-[150px]')} />
                ))}
            </section>

            <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                <ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {pillItems.map((pill, index: number) => (
                            <ChipDirective key={index} text={getFirstWord(pill.text)} cssClass={`${pill.bg} !text-base !font-medium !px-4`} />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </section>
        </section>
    </main>
  )
}

export default TripDetail