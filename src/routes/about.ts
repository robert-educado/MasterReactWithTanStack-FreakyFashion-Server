import { Hono } from "hono";

const aboutRoute = new Hono();

const data = {
    en: {
        title: "About Us",
        sections: [
            { heading: "Our Story", content: "Founded with a passion for creativity, our company has grown from a small startup into a trusted brand. We believe in pushing boundaries and constantly improving our products and services. Our dedicated team works tirelessly to ensure customer satisfaction at every step. Over the years, we've built lasting relationships with our clients and partners. Together, we continue to innovate and shape a better future." },
            { heading: "Our Mission", content: "To provide the best products and services to our customers." },
            { heading: "Our Values", content: [
                {
                    heading: "Sustainability",
                    content: "We are committed to sustainable practices that protect the environment and promote social responsibility.",
                },
                {
                    heading: "Quality",
                    content: "We strive for the highest quality in everything we do, from our products to our customer service.",
                },
                {
                    heading: "Inclusivity",
                    content: "We embrace diversity and strive to create an inclusive environment for all.",
                },
            ]}
        ]
    },
    no: {
        title: "Om Oss",
        sections: [
            { heading: "Vår Historie", content: "Grunnlagt med en lidenskap for kreativitet, har vårt selskap vokst fra en liten oppstart til et pålitelig merke. Vi tror på å utfordre grenser og stadig forbedre våre produkter og tjenester. Vårt dedikerte team jobber utrettelig for å sikre kundetilfredshet i alle ledd. Gjennom årene har vi bygget varige relasjoner med våre kunder og partnere. Sammen fortsetter vi å innovere og forme en bedre fremtid." },
            { heading: "Vår Misjon", content: "Å tilby de beste produktene og tjenestene til våre kunder." },
            { heading: "Våre Verdier", 
                content: [
                    {
                        heading: "Bærekraft",
                        content: "Vi er forpliktet til bærekraftige praksiser som beskytter miljøet og fremmer sosialt ansvar.",
                    },
                    {
                        heading: "Kvalitet",
                        content: "Vi streber etter høyeste kvalitet i alt vi gjør, fra våre produkter til vår kundeservice.",
                    },
                    {
                        heading: "Inkludering",
                        content: "Vi omfavner mangfold og jobber for å skape et inkluderende miljø for alle.",
                    },
                ]
            }
        ]
    }
};

// GET /about[?locale=en]
aboutRoute.get("/", async (c) => {

  const locale = (c.req.query("locale") || "en") as keyof typeof data;

  const selected = data[locale];

  return c.json(selected);
});

export default aboutRoute;