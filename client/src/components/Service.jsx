import Hero from "./bars/HeroBar";
import ServiceItem from "./members/ServiceItem";
import { useEffect } from "react";

export default function Service() {

    const firstLoad = useEffect(() => {
        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()
    }, []);

    return (
        <>
        <Hero name="Service" url="service" />
        <div className="container-fluid py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6">
                    <div className="section-title mb-4">
                        <h5 className="position-relative d-inline-block text-primary text-uppercase">Pricing Plan</h5>
                        <h1 className="display-5 mb-0">We Offer Fair Prices for Dental Treatment</h1>
                    </div>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo eirmod magna dolore erat amet</p>
                    <h5 className="text-uppercase text-primary wow fadeInUp" data-wow-delay="0.3s">Call for Appointment</h5>
                    <h1 className="wow fadeInUp" data-wow-delay="0.6s">+012 345 6789</h1>
                </div>
                <ServiceItem serviceName="Teeth Whitening" price="35" img="price-1.jpg" type="1" />
                <ServiceItem serviceName="Dental Implant" price="49" img="price-2.jpg" type="2" />
                <ServiceItem serviceName="Root Canal" price="99" img="price-3.jpg" type="3" />
            </div>
        </div>
    </div>
        </>
    )
}