"use client";
import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

const FaqSection = () => {
  return (
    <div className="flex flex-col items-center mt-10 gap-3">
      <h1 className="text-2xl">FAQ</h1>
      <Accordion>
        <AccordionItem title="Quels sont les délais de livraison ?">
          <p>
            Les délais varient selon votre Wilaya , mais généralement, les
            livraisons prennent entre 1 à 5 jours ouvrables.
          </p>
        </AccordionItem>
        <AccordionItem title="Que faire si je ne reçois pas ma commande ?">
          <p>Vous pouvez contacter notre service client au 0772722464 .</p>
        </AccordionItem>
        <AccordionItem title="Puis-je modifier ou annuler ma commande après l’avoir passée ?">
          <p>
            Oui, si votre commande n’a pas encore été expédiée. Veuillez nous
            contacter immédiatement au 0772722464 .
          </p>
        </AccordionItem>
        <AccordionItem title="Proposez-vous des retours ou échanges ?">
          <p>
            Oui, les retours ou échanges sont possibles dans un délai de 24 h
            après réception, à condition que l’article soit intact et non
            utilisé.
          </p>
        </AccordionItem>
        <AccordionItem title="Proposez-vous des retours ou échanges ?">
          <p>
            Oui, les retours ou échanges sont possibles dans un délai de 24 h
            après réception, à condition que l’article soit intact et non
            utilisé.
          </p>
        </AccordionItem>
        <AccordionItem title="Que faire si je reçois un article incorrect ?">
          <p>
            Contactez immédiatement notre service client avec une photo de
            l’article et vos coordonnées . Nous vous aiderons à résoudre ce
            problème.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FaqSection;
