export const HOUSE_POLICY = {
  checkIn: "16:00",
  checkOut: "11:00",
  depositPercent: 30,
  balanceDaysBefore: 14,
  cancellation: [
    {
      title: "30 days or more",
      text: "Cancel thirty days before arrival and the stay is released in full, less a modest administration of €75.",
    },
    {
      title: "14 to 29 days",
      text: "Half the stay is retained. The house is held for you until that window closes.",
    },
    {
      title: "Within 14 days",
      text: "The reservation is considered taken. We will try to re-let the nights; if we do, we return what we can.",
    },
  ],
  terms: [
    "Occupancy is limited to the number of guests confirmed at booking. Additional visitors for the day are welcome if the house is told.",
    "The residences are private homes, not event venues. Celebrations that become parties require written agreement.",
    "Smoking is kept outdoors. The good bottle may be opened on a Tuesday.",
    "Check-in is from 16:00; departure is by 11:00, unless a late leave has been arranged with the house.",
    "This prototype does not take a real payment. A future booking system will honour the same terms, rates, and calendars.",
  ],
};
