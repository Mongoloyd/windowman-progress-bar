import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'; import { TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react"; import { motion } from "framer-motion";

// \--- Utility for class merging \--- function cn(...classes: (string | undefined | null | false)\[\]) { return classes.filter(Boolean).join(' '); }

// \--- GTM Helper \--- const pushDataLayer \= (eventName: string, data: Record\<string, any\>) \=\> { if (typeof window \!== 'undefined') { const dataLayer \= (window as any).dataLayer || \[\]; dataLayer.push({ event: eventName, ...data }); // For debugging/Canvas preview purposes console.log(`📡 GTM Event: ${eventName}`, data); } };

// \--- Hooks \---

// Hook to detect when element is in view (Lazy Loading) const useIntersectionObserver \= (options: IntersectionObserverInit \= {}) \=\> { const elementRef \= useRef(null); const \[isIntersecting, setIsIntersecting\] \= useState(false); const \[hasIntersected, setHasIntersected\] \= useState(false);

useEffect(() \=\> { const element \= elementRef.current; if (\!element) return;

const observer \= new IntersectionObserver((\[entry\]) \=\> {

  setIsIntersecting(entry.isIntersecting);

  if (entry.isIntersecting && \!hasIntersected) {

    setHasIntersected(true);

  }

}, { rootMargin: '200px', ...options }); // Load 200px before it hits viewport

observer.observe(element);

return () \=\> observer.disconnect();

}, \[hasIntersected, options\]);

return { elementRef, isIntersecting, hasIntersected }; };

// \--- UI Components \---

const Card \= React.forwardRef\<HTMLDivElement, React.HTMLAttributes\>(({ className, ...props }, ref) \=\> (

)); Card.displayName \= "Card";

const Button \= React.forwardRef\<HTMLButtonElement, React.ButtonHTMLAttributes& { variant?: 'default' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'lg' | 'icon' }\>( ({ className, variant \= "default", size \= "default", ...props }, ref) \=\> { const variants \= { default: "bg-primary text-primary-foreground hover:bg-primary/90", outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", ghost: "hover:bg-accent hover:text-accent-foreground", }; const sizes \= { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10", }; return ( ); } ); Button.displayName \= "Button";

// \--- Carousel Component (Custom Implementation) \---

type CarouselApi \= { scrollPrev: () \=\> void; scrollNext: () \=\> void; canScrollPrev: boolean; canScrollNext: boolean; handleInteraction: () \=\> void; };

const CarouselContext \= createContext\<CarouselApi | null\>(null);

const Carousel \= React.forwardRef\<HTMLDivElement, React.HTMLAttributes& { opts?: any; onInteract?: () \=\> void }\>( ({ opts, className, children, onInteract, ...props }, ref) \=\> { const containerRef \= useRef(null); const \[canScrollPrev, setCanScrollPrev\] \= useState(false); const \[canScrollNext, setCanScrollNext\] \= useState(true);

const handleInteraction \= useCallback(() \=\> {

  if (onInteract) onInteract();

}, \[onInteract\]);

const scroll \= (direction: 'left' | 'right') \=\> {

  handleInteraction();

  if (containerRef.current) {

    const { clientWidth } \= containerRef.current;

    const scrollAmount \= clientWidth / (window.innerWidth \>= 1024 ? 3 : window.innerWidth \>= 768 ? 2 : 1);

    containerRef.current.scrollBy({ left: direction \=== 'left' ? \-scrollAmount : scrollAmount, behavior: 'smooth' });

  }

};

const handleScroll \= () \=\> {

  if (containerRef.current) {

    const { scrollLeft, scrollWidth, clientWidth } \= containerRef.current;

    setCanScrollPrev(scrollLeft \> 0);

    setCanScrollNext(scrollLeft \< scrollWidth \- clientWidth \- 5);

    

    // Detect swipe interaction (scrolling happened)

    // We debounce this slightly or just trigger interaction

    if (Math.abs(scrollLeft) \> 10\) { // threshold

         // We don't call handleInteraction here directly on every pixel to avoid spam, 

         // but we rely on the click handlers or significant movement

    }

  }

};

// Add touch listener to detect swipes for GTM

useEffect(() \=\> {

    const container \= containerRef.current;

    if (\!container) return;

    let startX \= 0;

    const onTouchStart \= (e: TouchEvent) \=\> { startX \= e.touches\[0\].clientX; };

    const onTouchEnd \= (e: TouchEvent) \=\> {

        const endX \= e.changedTouches\[0\].clientX;

        if (Math.abs(startX \- endX) \> 50\) { // Significant swipe

            handleInteraction(); 

        }

    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });

    container.addEventListener('touchend', onTouchEnd, { passive: true });

    

    return () \=\> {

        container.removeEventListener('touchstart', onTouchStart);

        container.removeEventListener('touchend', onTouchEnd);

    }

}, \[handleInteraction\]);

useEffect(() \=\> {

  const container \= containerRef.current;

  if (container) {

    container.addEventListener('scroll', handleScroll);

    handleScroll();

    return () \=\> container.removeEventListener('scroll', handleScroll);

  }

}, \[\]);

const api \= {

  scrollPrev: () \=\> scroll('left'),

  scrollNext: () \=\> scroll('right'),

  canScrollPrev,

  canScrollNext,

  handleInteraction

};

return (

  \<CarouselContext.Provider value={api}\>

    \<div ref={ref} className={cn("relative group", className)} {...props}\>

      \<div 

        ref={containerRef} 

        className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide \-ml-4 pb-4" 

        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}

      \>

        {children}

      \</div\>

    \</div\>

  \</CarouselContext.Provider\>

);

} ); Carousel.displayName \= "Carousel";

const CarouselContent \= React.forwardRef\<HTMLDivElement, React.HTMLAttributes\>(({ className, ...props }, ref) \=\> (

)); CarouselContent.displayName \= "CarouselContent";

const CarouselItem \= React.forwardRef\<HTMLDivElement, React.HTMLAttributes\>(({ className, ...props }, ref) \=\> (

)); CarouselItem.displayName \= "CarouselItem";

const CarouselPrevious \= React.forwardRef\<HTMLButtonElement, React.ButtonHTMLAttributes\>(({ className, ...props }, ref) \=\> { const api \= useContext(CarouselContext); return ( Previous slide ); }); CarouselPrevious.displayName \= "CarouselPrevious";

const CarouselNext \= React.forwardRef\<HTMLButtonElement, React.ButtonHTMLAttributes\>(({ className, ...props }, ref) \=\> { const api \= useContext(CarouselContext); return ( Next slide ); }); CarouselNext.displayName \= "CarouselNext";

// \--- Scroll Animation Wrapper \---

const ScrollAnimationWrapper \= ({ children, animation \= "fade-up", className }: { children: React.ReactNode; animation?: "fade-up" | "fade-down"; className?: string }) \=\> { const initial \= animation \=== "fade-down" ? { opacity: 0, y: \-50 } : { opacity: 0, y: 50 }; return ( \<motion.div initial={initial} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className={className} \> {children} \</motion.div\> ); };

// \--- Types & Data \---

interface Review { id: number; name: string; location: string; platform: string; platformIcon: string; stars: number; headline: string; body: string; savings: string; avatarUrl: string; }

const reviews: Review\[\] \= \[ { id: 1, name: "Maria G.", location: "Miami, FL", platform: "Google Review", platformIcon: "🔍", stars: 5.0, headline: "He told me what to say before I even booked a quote.", body: "Window Man coached me before I talked to any contractors, gave me a checklist of questions, and helped me avoid a $45k upsell. I felt prepared and confident going into every conversation.", savings: "Saved $12,400 vs. first quote", avatarUrl: "https://i.pravatar.cc/200?img=47", }, { id: 2, name: "Darren P.", location: "Tampa, FL", platform: "Facebook Recommendation", platformIcon: "👍", stars: 4.9, headline: "Uploaded my quote, he highlighted every trap in 5 minutes.", body: "I uploaded a PDF and Window Man flagged junk fees and unnecessary line items immediately. He showed me the real price range and what I should actually be paying.", savings: "Saved $8,200 vs. competitor quote", avatarUrl: "https://i.pravatar.cc/200?img=12", }, { id: 3, name: "Lauren & James K.", location: "Orlando, FL", platform: "Nextdoor Review", platformIcon: "🏡", stars: 5.0, headline: "We read his email to the salesman and the price dropped on the spot.", body: "We shared Window Man's breakdown with the next contractor. Using his bullet points and questions, we got the price dropped without any confrontation. It was almost too easy.", savings: "Saved $5,150 vs. original offer", avatarUrl: "https://i.pravatar.cc/200?img=32", }, { id: 4, name: "Anthony R.", location: "Fort Lauderdale, FL", platform: "Google Review", platformIcon: "🔍", stars: 4.8, headline: "He told me my quote was actually fair. No pressure, just facts.", body: "Window Man confirmed my quote was good, suggested small tweaks, and didn't try to push a sale. That made me trust him completely—he's a neutral advisor, not a salesman.", savings: "Confirmed quote within fair range", avatarUrl: "https://i.pravatar.cc/200?img=33", }, { id: 5, name: "Janet L.", location: "Sarasota, FL", platform: "Facebook Review", platformIcon: "👍", stars: 5.0, headline: "Found thousands in junk 'administrative' fees.", body: "I shared my quote and Window Mans audit pointed out BS charges, overpriced add-ons, and scare-tactic line items. I went back and forced the contractor to remove them all.", savings: "Removed $6,300 in junk fees", avatarUrl: "https://i.pravatar.cc/200?img=45", }, { id: 6, name: "Kevin M.", location: "West Palm Beach, FL", platform: "Angi Review", platformIcon: "⭐", stars: 5.0, headline: "Used his breakdown with the next company and beat the first quote by 30%.", body: "First contractor tried to rush me. Window Man broke down the quote, then I took that info to another company and got a cleaner, cheaper proposal. Game changer.", savings: "Beat first quote by 30%", avatarUrl: "https://i.pravatar.cc/200?img=68", }, \];

// \--- Main Component \---

const LiveSavings \= () \=\> { // Lazy Load State const { elementRef, hasIntersected } \= useIntersectionObserver({ threshold: 0.1 });

// Interaction Tracking State const hasLoggedInteraction \= useRef(false);

// Effect: Track Impression when component loads/becomes visible useEffect(() \=\> { if (hasIntersected) { pushDataLayer('view\_promotion', { promotion\_id: 'live\_savings\_reviews', promotion\_name: 'Live Savings & Reviews', creative\_name: 'carousel\_v1', position: 'bottom\_section' }); } }, \[hasIntersected\]);

// Handler: Track Carousel Interaction (First time only) const handleCarouselInteraction \= () \=\> { if (\!hasLoggedInteraction.current) { hasLoggedInteraction.current \= true; pushDataLayer('select\_content', { content\_type: 'review\_carousel', item\_id: 'live\_savings\_scroll', interaction\_type: 'scrolled' }); } };

return ( {\!hasIntersected ? ( // Lightweight Placeholder to prevent layout shift before lazy load  
) : (  
{/\* Header \*/}

## **🔴 LIVE SAVINGS & REVIEWS RIGHT NOW**

        {/\* Testimonial Carousel \*/}

        \<ScrollAnimationWrapper animation="fade-up"\>

          \<div className="mb-12 relative"\>

            \<Carousel

              opts={{

                align: "start",

                loop: true,

              }}

              className="w-full"

              onInteract={handleCarouselInteraction}

            \>

              \<CarouselContent className="-ml-2 md:-ml-4"\>

                {reviews.map((review) \=\> (

                  \<CarouselItem

                    key={review.id}

                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"

                  \>

                    \<Card className="p-6 bg-card border-2 border-success/20 hover:border-success/40 transition-all shadow-soft hover:shadow-medium h-full flex flex-col select-none"\>

                      {/\* Avatar & Header \*/}

                      \<div className="flex items-start gap-3 mb-4"\>

                        \<img

                          src={review.avatarUrl}

                          alt={review.name}

                          className="w-12 h-12 rounded-full border-2 border-success/30 object-cover"

                          loading="lazy"

                          width={48}

                          height={48}

                        /\>

                        \<div className="flex-1 min-w-0 text-left"\>

                          \<p className="font-bold text-foreground text-sm"\>

                            {review.name}

                          \</p\>

                          \<p className="text-xs text-muted-foreground"\>

                            {review.location}

                          \</p\>

                          \<p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"\>

                            \<span\>{review.platformIcon}\</span\>

                            {review.platform}

                          \</p\>

                        \</div\>

                      \</div\>

                      {/\* Star Rating \*/}

                      \<div className="flex items-center gap-2 mb-3"\>

                        \<div className="flex gap-0.5"\>

                          {\[...Array(5)\].map((\_, i) \=\> (

                            \<Star

                              key={i}

                              className={\`h-4 w-4 ${

                                i \< Math.floor(review.stars)

                                  ? "fill-success text-success"

                                  : "fill-muted text-muted"

                              }\`}

                            /\>

                          ))}

                        \</div\>

                        \<span className="text-sm font-semibold text-success"\>

                          {review.stars.toFixed(1)}/5

                        \</span\>

                      \</div\>

                      {/\* Headline \*/}

                      \<h3 className="font-bold text-foreground mb-2 text-base leading-snug text-left"\>

                        "{review.headline}"

                      \</h3\>

                      {/\* Review Body \*/}

                      \<p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow text-left"\>

                        {review.body}

                      \</p\>

                      {/\* Savings Meta \*/}

                      \<div className="pt-3 border-t border-border/50 mt-auto"\>

                        \<div className="flex items-center gap-2"\>

                          \<span className="w-2 h-2 bg-success rounded-full animate-pulse"\>\</span\>

                          \<p className="text-sm font-bold text-success"\>

                            💰 {review.savings}

                          \</p\>

                        \</div\>

                      \</div\>

                    \</Card\>

                  \</CarouselItem\>

                ))}

              \</CarouselContent\>

              

              {/\* Navigation Arrows \- Overlay Style \*/}

              \<CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 \-translate-y-1/2 z-20 bg-background/80 hover:bg-success hover:text-white border-success/30 shadow-md backdrop-blur-sm transition-all" /\>

              \<CarouselNext className="hidden md:flex absolute right-4 top-1/2 \-translate-y-1/2 z-20 bg-background/80 hover:bg-success hover:text-white border-success/30 shadow-md backdrop-blur-sm transition-all" /\>

            \</Carousel\>

          \</div\>

        \</ScrollAnimationWrapper\>

        {/\* CTA \*/}

        \<ScrollAnimationWrapper animation="fade-up"\>

          \<div className="text-center"\>

            \<Button

              size="lg"

              className="font-bold text-lg px-8 py-6 h-auto bg-success hover:bg-success/90 text-white shadow-lg shadow-success/20 animate-in zoom-in duration-300"

              onClick={() \=\> pushDataLayer('select\_content', { content\_type: 'button', item\_id: 'view\_sample\_report\_cta' })}

            \>

              View a Sample Report

            \</Button\>

          \</div\>

        \</ScrollAnimationWrapper\>

      \</div\>

    \</div\>

  )}

\</section\>

); };

export default function App() { return ( 

    /\* Custom scrollbar hiding \*/

    .scrollbar-hide::-webkit-scrollbar {

        display: none;

    }

    .scrollbar-hide {

        \-ms-overflow-style: none;

        scrollbar-width: none;

    }

  \`}\</style\>

  \<LiveSavings /\>

\</div\>

); }  
