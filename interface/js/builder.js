function showFeedback(message) {
    const box = document.getElementById('message-box');
    box.textContent = message;
    box.style.opacity = '0';
    box.style.display = 'block';
    

    setTimeout(() => box.style.opacity = '1', 10);
    

    setTimeout(() => {
        box.style.opacity = '0';
        setTimeout(() => box.style.display = 'none', 300);
    }, 3000);
}

let currentBlocks = [];


const PREFAB_BLOCKS = {

    'header_block': {
        name: 'Header with Logo/Branding',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'image', default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAB0CAYAAACrHWTsAAAQAElEQVR4Aex9XZLjNpbuAdMd17WHbjdUC+jSDprp8j6c+TxzI+7D9I2qeUnVS7vieh5uxMw8V3ofrpS8gywvoKR2zx7sia4S5vtAggJJ8E8SlVQmGDwCCBwcHBwA5+CPVPLV69/WfUC/+lXLEa4+eT0lnN+/+jU9glgPIvFPr/9t/c+vvzcE+g8iNsHE//tf/98Vy+bg/7z67ihteYJFjSxFCZxUAglyY2fqA0A97M6NUJ+8nhLOYUKNqaMEogSiBB5IAjQgD5R1zDZK4IlLIBY/SuDMJRANyJlXYGS/WwIX28+rL8ynmYP///b1pjtVxIgSiBLokkA0IF0SivGDJLDP/gLT/POr7/feC2L6NiZpMHxow3VxXTQdHl3iEug/FXTl1xV/Kj5jPo9bAmdsQB53xZxT6aj8sUG9BJhP6gu7Ic/NeDwv2xQZ0t0Ax6YRJUub5tX3Nyw7/Q6AVzMuCGPaIk8P16YnDQfATV08XccT8rZ5Mgw4NwxnGMDyZMNffx8sg8UFrw63VG6Eu7zpchOftBwwrAouji7xGf9Pr/7tHZ8twM8w8uny9MMZZ3kCv3488RkXIUpgDAlEAzKGVJ8QTaugoPxR5JKSV2J4ECL9h/rd0uIAwb+h5JYwGgs/zKZRskCcod+BjwNa1hjkaYs8C1ykp2KlMnXpVGK0i6frwo2oIhz0UhoBxJVo8rlaBtK2uMgL8aXb0kc4eXARZqv+yHAHLty5pOfi6LpwpUzBH/2QS0lmxEU4T5hZI2d5EinzD15sOolXlMDxJRANyPFl+mQoQpnfQPEWRsCI2oiRhTHq1vohCUVDAiXmRtUIEpvOU3TEZRrErQDtN4yVpemwkJ/L0wUxnkrfPfd0reIN8UJ6RqkrKnrS+of87oYugfjMH3AJWNhnRDANZxDwHusmfwRkAzmXqTrjVw7dPaWQuU27CzrMF1NHCVAC0YBQChEGS8AqJBgGl5AG4D+/+5fZf7z9y5v/fPsv178z/7hEXGEQtiaxS0QIE9/oiMiK6ZjmP777yyU3up0SRlzpro2kjVwyPwLTM61LsI8CNzB8Pi/Q1IVxJL3CcCgplLEy5pr5A1aAN4navhF3eXgu6BCX/EFGirLFzOO6SsvFWznQsJYR/lx+jE9RAodLIBqQw2X4JClAyX/rF5wK3H/mpjUUWaHkqIA/yRff+jMRi29kp3ARwHRUyvCG7kJxW2X59i+FgSIy0zKcfgsDFXi1DDQIoLPLI6eHsuxOcSm5scYUiLz9E19U9Aw7FvxO/mFlxXIynypdP/4L+fSDH4/60v5z9EcJHEMCkzUgiTGzRwte2f7r7bOdgjpGjZ6KRq5MmV1JaTMgByo6KK5C2cJfU2JQ0rXyQ/kVaXJSUjU8UOIlBenw/HD4ta/cHU7IbSoDZiEFf6QXSJsKltW458EZEmcpMJSaZScE8PcKguw2Pr3cX/AGoqs8DF4R+pnGPsSfKIGRJDBZA7J5+2zzFGCkeh2dbIMyreULvMIYYNlFc0PZITUpOCo/h9PkhoxME26fcJ9PHx8b8H/zn7kPks+sfOUNG2JoHFOU8QoP9nQXcf20h/ib+DuEZkwbJXCoBCZrQA4tWEw/ugQKBQqlSeUZzNCIKuIwyqcx+ckhQikGZwjV2QbxYXiYll4LHOVbT+UHCr/Ij1GHGhrk+0fS8YEGDnsRlyj3Ncp0i7hCFvDbm2XbYyPfpo0/o0ogEj+iBKIBOaIwnyop30hUZUBF6sLg31QVOtKW9lKIC6VcC6umI14foLLvg4dZQxrCA38lg+TT+/e//t9b7pvQmGBWMvMMiiWF8gYNpI30fj4nF8G8PZTojRKYpASiAZlktUyfKSjLYg+iSVEGZhI/WQVsZHe6SRn7HgNxsV9xw70EEakpVKaDMi9mIUapdxK4tibZHbE1irODAFYwqHbUlUtQKOeVwzagBx5T7HUUXy7mM+PJnzMoPp+cEQFKy2AuDdMRQLdmMBkeIUpg6hKIBmTqNfQA/FGJNwHDoQBv8lNAxdINFTrDASkVL9wbKMZCycN/6zbMMZv4wVeyKGKK+HeYBSxojPAcvP3TWcTLeXH5UbEvGe4Sw18YORfW5rIMfHfDGbNP6ou1j0964L0wYnjW4Ll0CgvlTm14npBywjJYkYbBLh/g3sAYLRFWM5gIi3eUwOQlEA3I5KvotAxS+XUBOeKIG8s2184QMA2U6QKwtIpXyULyizhc6skf7Qkhe8TVSIEj+UVcjPqL4795sHWsAfLS5Hm6/JZAKhQxaVh8BPa5bb5iNNJdOWNWScf3POxJJ+D4/KUsszVmr7839HvpLH7OR2FsyTdoXAGX5U+RqGRgvPTRGyUwaQlEAzLp6pk2czQiTYag4NzIgi/nFc+5h2mhWN/ACM3EiN2Qpkvc6ojdH/UzDZRvYbhycoVjlTHocTmpCOzjMbJC/lToUr1gUG65z+HCLW0jxVvnDKdRoOugmgblDPJMfv2ZlUsf3SiBugSmFxINyPTq5OQcWQUGpQsFetkHoNCLpSHfEFjFjn0C0FgALqF0FRV+tUBcInLAOOCsqJTp8hl7BppuExA3N1zO8DA/wiUNkKPj0nMZifw4IM8uzneRzho0lgO4pLeA4p/5syeHT1zyQFwCDUZbGubp4+e4O349+Vt+mZGRN8CzdQI+/FkPYwVxrfF+vbqXDLOE8TdK4DgSiAbkOHI8aypQhnZ5pq9LZVgtMMOo2KlsQecNoFiy8XG5PwJl+84Bj7piLyB1OPQzzj0bURvSds/OZRjzYJ5wmR8hmKfDBZ4tp6MRconr0+RzCI9hjCMuwSv3G4YzvgoMJy4BvJT4xbPljS7xmJZ+By6M4Q5cHN194h2d6EYJ7CuBaED2lVxMt5cErKIzUiwV2aUflX/Kvb6HIHYULUe5IpEogSiBI0sgGpAjCzSS65YARsxceimMCFNYQ0JPDpx5YImGH0sMzipytOhECUQJPKAEogF5QOE/5axpRLCuX7x8h2WrWwKMxoJ7CqG9jGPLy345l7MhQJJsizfkj51PpBcl8Fgl0NuAPFYBxHI9nAS4nMX9AO4fOKBhYdgpuGI+zI9A/ynyjHlECTwmCUQD8phqM5YlSiBKIErghBJ41AZEv/pV/+H1b8spw+9f/VqcQDphvceszkoCkdkogWlK4FEbkE8iWomkUwaJV5RAlECUwJlK4FEbkDOtk8h2lECUQJTAWUjgKRiQs6iIyGSUQJRAlMC5SSAakHOrschvlECUQJTARCQQDchEKmIKbOj5N6n+09c3vWH+9ZW28E08CDCFCpwiD5GnyUjA9e/nL16+m714uaR7KHPJoQRi+sckga1WSi16g1HvlAWzRINcA5YaBuUxSSSWJUrg3CWg56lG31wrY5bs20bkSkRSuBruQXc0IAeJLyb2JMDGmNKgsLFqzGa8uOgdUQKQNw14CaL8xxE4Z+dVeR9jJD8OtxlVZS7ewcf+CWd3K5GD/4cmkXhNWAJny5rGaOcdO9vZluC8GOcSYgW2NYVxXkWaJrcYwVfkfJyR/Fil1dmKAHm2WRhjFkZ9nhE+fnhf/4sAi9X/JxqQ/rKKmMMkwOWwq2hEhgktYkcJHFMCWBH41tFTIrebn+/ebO5XG4ILP8R91AbkC5GNUebaPCAI/2DpkBqaRtqVMWbhAxsjWOv6Um5mROJyFkQV73OTwCPht5h9bJUq/gjuWGV71AZk8/bZ5u9/fXb7kGAewVdeYSw2duTC0UsOHzH9XX94fwnAIOfzDA2yaT3VLmchPt5RAlECJ5SArgzcNvc/dg34BnOXDE4RE0QJVCSwwZTYqM+XnKFUotyj1pXG7CKiGyUQJTCWBMbfB0vGYj3SfVoSoBGRZMspcjbKqRQfm+o3laDao56nMDSA/F2U2YuXPFlkjwc/f/Hyne5hhDIa7v2UnSvexX2ZnLaln9Em7vD3WTR5zvklHUeXfoLGJiZxpOXKcJi/D6l2SfR8JxPyLrj8NHis3YlRfw7haNKyPPl5fc1jneIu5uHKAdfKn2Euvupq0oQMgGvlSdeVXQZeOqfF/EgHYPPvS8+m7yof8iA90O7FL9udk6WIaAlcLj5zd3UXQG0N0vOsrnPeDFxCbxlYXlEXlB+WBor9D8FyPsMK6NGXkKbzTjoxIkKUQE8J0IgYpd40oKe6pdEyTpmLJWCtlFoQQCcFaADPrF/BCNkOz06AsIY7sUeJ0Xne+UBkPU+z8/CgLyKkTdBGBLQV8LP3WfQ81dJx6XmqyYfPL+mISCoA+gnKvidzsSQuwoN3hqOQ/w5EEtIRpvPzyOUiytJVNk2I6C7vKk4yWD6gnzLf2YuXa/KD5+J+DsOuzIWtMwSSZ03X5T/DIEDPUy0dl56nWd3ktJifiKSSKey8/hVfgKvxABzvDpdPz1M7OCE/CnmQPxGp0a+WT3Ch3d2oXN541IDqXZKpq7sqUtuznoM/KH7y5pVd8kvDLWTwHDLX81RL4EqM+ZbpCYhOAe7mfqTtV1nccWYniaMe3SiBY0ggX2cNzkJku/1zKA92WnTSJeKCnQLh/m07AtP4gV1+DePFzgm8rjw08FpfiHS0so4Iit235XkGBdyNusNgGQfksUu4h8+VCUnb5MNyXBEXeILyLHNFzMcmgHK9YN02xRdGEghteSPa3uRh8RxK1D4N+FHZ+xC+Uq2lprxnA+upRmRggJ6nbHPOCIt3cV+RfYlQBFPmCoMtVw9FBDyIS0UEvq57W6LZhd0UnzRFxPAogX0lgL2QYONE56w17hlGqAhfDM2Laahg+6bLDVRfdHRodaNhdKoJtO3shi9myR6X7qv4uATFMu6Rx15JIJ/OJcacMGRjOBOgUajVZ45TdRrLvW/9Q1Fe9ZUlmVFQuHAP5hc0jnpr254u1uJd6D+L9Yf3CjAD8KAKAVVk/H5i68FLZr2Ge5H2PQ91aQPyH6wMXCLOvv9Bd4N9yzzqICc5KHVMHCUQkkCS/BQKRpgGFLfGWjUeQp16w05kQZlrJXIrgUthKUoHlHwAtRq0IU0CIoLGDuHsoDWlmpgLhpXKAdyMX6W8Tmr4khZHkIje3UakdSnPYQKvtC/hwp1rbF7MT5UURRFvzKILx+Hmrl8P5JuQR9UcjRAfH4/Shi8oTxVf8rqrhQvW6w35J7TUP2hiNlTev0Happs8+3Gd/Ob8CeT4BoC6tbIOtZeNi6cr0n90r7JZUcEX0/PEYxHgeRhO5e8F1Qzz5t6947EtlZcrAy6OrkfjIG9yUOqYOErgAAlwXTmQfLX+8H7GzmLh/u7244f31wajKuDWOj2GZYNmA+yga9AnTQL8UAyGyh7ks9v7rSl7KK2awjNKXWe8/rhi58zg7tZgNOjRcl507HLndhEtbmagcoVKvEwhML+Go5mJ/K0Th4TKAEX4maNeC+C/7Xi2TUlFv96NllEdZmEj6j/YgygfUgByqO4G1r+6qWfVHOLza9Cm+NyASEeGJQAAEABJREFUrd2Saw85bnycDZR4A81SsM4GP0V7Qju6JJ0SUuWBtA2Mqgs2Eh6QcAbrcPKBkns8qpsclVokFiVgJfCppuhtsIiW/HoeXsPerD+8D46os46jQoq+ppjyLGpOUwfdwEgxrpYAAQElV5QB0fZu6vTkGQj1EetW/ojwXjcVHGRSMqi9Eu6BZPPxlB/5N2EjaKlTMdFw2of8h88Mzx8bnXz5sSZL5BeqY2nhZVj9/3xXHPIgTfLrK+RGhkeI8NsW67mpHdWz3vptqiZD4tOw0CVslfmJ7hgQDcgYUn3iNNkxu0TgN3CHi45cdG4X5rt5B/M7j41GR+wzCsXsoGG0DipNtBFVutfZaJvr0wWUELwHPU+1iKRSuZRStbAKintcUcG5hzFdyL5RcSPf4IBgqz4H62vb9Mazd4gCMqgt0SksVba1nTxuhPovKWQUN7vBY996yhIM+NXZ8q0ukmRH4IvHNk9NDp5cvXQ72l7gsb3HNyDH5jDSOzsJ6HmqpfsK4mhM69tAYX08QDpIy8czyvAdFT+o5scosKacgNR7hKvnKXC/tt//mvFwgLkobY7KwAvGKjgbG0jmGOhBA5IrsgD9xhmoj6v9B/q3xmza6p5xY9R/Xo5g3ZOvMUAZ9a2jizLd5jy4oEFu1dBRTmUCYQNZxtnvKdkvWUwVJdAmgS9qyiHHtopIZ6OvPGjnKHvW3iwxo2gEzFxqI1dQgOLuMlqJzRu4zXfz5n8wjZ7DYPzp6xsaCwBs1MXalgGb+yKSymFXN7+H0a+k7iGfcoq9+dPzVEvggiJctNU945rrv7y/EiA/taBCBts9lpiUN5Dy/VkhtwVtPh9inJi+DZK2yBgXJbCfBMoN2NFAQw+N8lz0gW6j0crp9hoV57gVp7JEwPV7GAwYCxiM4xiLSoYie8pKzuNK0tPzmext8Ebi1VPy28H9AobUS1/m8FQb6Mw14U+EKIFjSsBvwEG6AzaRg+lPHZjI31yWNB4cKeO5sQMjjspqhSnJNZbFFngefHM5Z3CiJ51g21Yfk5KMxjKtz9DGO7jgh3f4i/JWZzAwLoWBHrsdJR1MnnW0fvWr/urVrzcPCWqbBN++PmvBdjCPBhxaZpJic9VTyD4pjLpv9wWfTtjfNUNhqnYlpLH0lhsPIlchO2qrFF/64jHYS57uqiLFZ0ogoYGlpwRK5ID6D9OUSV7t7awny4UBEamVfRfX0Nd65tGJlnRinDHCJx4b5RJDT5BR8ExQmZ6xWFtZfx4+nmvT5Ced4E+CCoQG5uOH99f7wI42yAfvQzrt1i4xYH8jdNprY3KjwRNT3XwEmXtigZ8eoP6nJOJS+w/Koo1bjYFMOX4nTz1PtZSurO2Wgo74kByRViT1xCXA5R0jEjSYxnv5SWTX4MW7+CE47/GoXij/4tRLE+EmHG+JodI5RVCuN21GI1GqlqYp/6cSnsuzpjjHrP9pybbU/nscAClzX2mnq1yeOVKS5h7rlONs0FF/kqNSi8SenAT0PLUdYMZjq5zBSfDa+Ms5eaO2o3ofG8Yn1aAnLRdnOMyrCi1JXBRoN5/U0dmortT58oSWT11Zt87j4CQ1RYjA4maZiodTeia+z6RErFyluGCMRVrriKgH1D+TTwLy9u/x0md5NUPXWTss2ilmv6V3cRKjiiVzyPg2SzXebzIe6Uj5sUiASpAd14dcgWMAfrFW2fsORaOulhuNvPaSmlGfa2FIp0FrqeeplsDlzXBSRBcAJjrf8QC+KGPekQb9Pmh0SmVU6LMaAt7zDloaNe6SV05o7SLEfq0Wz8GyIHzUG3s1V6NmcCDxbfglRNQ/6mie6hB51h3aIsuVIr4AKMpWIw7cse9OwxdgoDCgbJeB+FqQnqeUz43kF8p9W539Qj5pHi1jb6Azn4Q/EaIEOiRg/zMDjfPKAfCLhgp/422wdFVt5ETmKIwdgP4KoJNcLJ9jL0VjVqCh3Kk4Zq0znN7rvPZT4KBV/EEP/GDRLCs8uEcsD2Rvr5NfBBadHn57U1GTP/uAH41OTp5BlzR7yUgOv2p8gaT9fw3KkaDBl0zoojwbTqgNrv9t2BiNUlrwHJK1HZywzjNZd3/gcTcwsWza/5axvoYfjfpT2YcXizbVUG4t7hp5A53ZJPyJcPYSmGQBjDUed43T6G3W8UOjR2uwFGYFGJ0toaQXKGDRceAvbnTEy839KkSjwAl42MnsH/QE4oog0M5nH1lQg/JwRon/HGfQyTEjswYpyG9G6WS/Vo40+ifLcUhG2ec7VoEklu9+9W+u96j/QJY9g5pfNt21qR7Lh5v7H1doTwuXK9v4DIMkjQGTC6Or51gi/tPXN6oyy0dD61Hu3gMr2fdK9k0Y00UJNEmAHWP94b3a3N/dNuEwfHO/2pjsY30hJUKUVsg6UTZDaEVEpBK5lQEXy7BBJy8laVZ4JTTvwR7t9Z6dVzvPMVzIkMuBQ43oMbI+iEZe/3u/K5PV0d2gej2IYZvYLmXu1V5tcv+n3p5SDphmL15yhkxAE7+o/dEUAmE86uXWmLH75Clf/3kMfzQgY0j16dGk8rLKEsrMfjm2rwjYyJFmqBKB4VGYedQ7UVO+PCJMhdMU74VntL2vtrq4gbySzrU0jFj1PNVypCvni9/NOo5iOxJffciQd4EizeuG7ahXMswOL3lsug/yMXHIb6297pkBaa0/vL/My+5TYdsg+GH0s001tvtTb6CToWhAKIUIuQS22dvTWHriKKcb7Etz/CotX5yzhoOdIifW22EaKgPD/2dA3iqbLVAZOoVC1075qTjWH97PNtXZQY/cijyMWQDd0Sft3PiZ6y7am/vVpqBT53VFZUC5OTrkk88VeIP8i7sSd81nKtUCoYeHfCHPS2NlyD+aMpaOAY8ExmdktsE6Jp9ZfP0X6X8AlOihHjjrqSPnIXV8A2O6DR52IG+5TMG/cX8g5uqHFFlHNdkyog7Dy0ca4Ld3GT1+Z0bVZT247jBYyerNVMvuldv2tdZ2v1WqKMM2Wx5m0UaFaECceI26lQoYEb8Ry2O/bMfAstOmN/RbPuorN5f/xw/vqcjdG93OQNkRZ5ui65OPzQMddo2RH8AaPrpUYCx3HxrEsXQgpwqvOY93t8RxQLp1WFE5WJR63N0t6dvIgT9Mt4FxrdJ0ZLJ40i+Diw+5VVrZc3PdN+XB8BB9F8Z40q7ItFL/dyXZurTOdTRIxwcX3+T6uDt/cxlJJ8uLf+pVliXDGT8EmIb5VsrO9pm3qXZemNemVO+79sW4sSAakEyym1/e/q/rKvz9uy8vf/nuyxlAJcbMxJhFblSyVPH3CBKIJKIEogTOVQLRgPSsuc3bZzAyz97QqDhj0jNpRIsSiBKIEniUEogGZI9qdcYkGpI9hBeTRAlECUxGAocyEg3IARIsGRLvD14OIBmTRglECUQJnI0EogE5QlXRkGA2cmk34QfSSyTp/MjfQJIRPUogSiBK4CQSiAbkSGK2RkS2b7jRPoikMin/t2RQmojcIgEe4/w8M/Y4687lCZWWRPtFxVRRAk9cAtGAHLEB0Ij88vbZUCOit5IUH0g7IjtPktTmfrUJwZMURix0lMDIEogGZAQBQ6g/mOwdkn7UlUl//+rXtB9yxIoSiBKIEpiGBKDrHoqRx5svZyIXxvBN3eJlsY7S6rgX0iGhGB0lECUwOQlEAzJSldCIbDMj0i8HzEL6IUasKIEogSiBaUggGpAR6+G/3j5bDVjK0n/411+vRmSnk7Sef5Pyvy2OCt4XQjX8IdqdjD0QQohXyuiB2DlqtscmRrmE5ZWGPgpYy745/TdpDTkGTEYCyWQ4eaSM5EtZ/Upn1AMf6d3a/7bgfxMcDbwyKfgDdB/UaDZVjJ6nQVlIyz8QypO+wm1HpO/ftYbTJ8Y8cJ940pXaWfikE+PICFjWuewDf3j92/JQgLK66ZMXGik/hX3kkmbkuJTV9/0QJZJKvEaTAEfIsxcvlz48f/Ey+Fe2ozERCUcJPCIJnNSAUJlyWacPUJkeCqynPnmRL+L2hoGIW9kGP2MdIhNPY4WkcpwwDChooEuAJUZ9HOqRSpTA05PASQ3I0xNvVuIvBnzmBBXy5yxV/I0SiBKIEpi2BKCvps3gY+COMxyMdFd9ymKU4gi5D+opcVbGmMVeoEwx+zLw12go8+aUBRmSV41XyKDpHwaH0I24B0kgJp6QBKIBOVFlQBn1UpRKZHJLKuDJ/guf/dOln+/eDHLv724lv/iHObW0XnyONglnc78Kl/m++499JlGAyESUwAkkEA3ICYQ8MIvJGZCB/Ef0KIEogScigWhATlTRQ/ZBxvy44omKG8xGz1Ot59+kVZCOS7t0f/r6xp2g4ukpgua7JaApDZd2aTMcLYGrzE9a4JTDHd+7+ACpIkjPWdavr9zJL8sr+M/47UvD5em7u7Q2D9AkbV8uzEMGXtrj19GjSyA9ykIe0aVteSFXyK9URx3tSToubelW6j1Ak/KsgvS4tKV/XL4tzVwOrO9qWyKf0nAlDeEx+MgS4D7IkUmeHTllLt4pY5YVaD1Gy86NdGubRqkFCp0SsKd0RVBGWZrPX7x8p9G5pHIl5uLGpkW+iNKA6p26eLoiCemLnqeaz1WQbdL6XoJGR5y9eIntngvwDN5yni2v8CvL78UaOGvmIS0X8rZlg1vILEF5mETDICpzsVagSdoISwn0M4/Zi5ed9IFvywlc0Act8ubRIy0C6ZGH5w0yJp1zAY163ZUXbRHlpQxFJPXLCpw16xLhvW/KR7FOcjkiYZ3mnAOLb0ptjrIlaMRJw6URN3vxMq+nVr5NX75Jk7iKPOdyoAxEpNSWyNvMtqdvGC7+lfgP0T+6BHp9G+vTBPdBRpdMJQM9TzUa7TLv3NJ1seErc7Fkh+jCHSNeD+RXUMf78qut8TBL0Gi7YQAhD+A2IWmMjMHDGvE1xYCw2v3QMq4xNDAgk9tF3/LaF0lnDYrTz1pndb+mfKT1ElsnIlstA66BfAv7TBffep6SFzsAkX4X8E2tfyX90kasU0pgyHLXKfk6VV46b9wiksqwi53+SrcozWHk+mEzP4VRHLD34Xcxg5JC2l43lJQdvfZCtkbKBGd4Gc8qGNdBO5dxqjvwJhUNGWP0brqMbohnKs53bQMTldV9X3mAXn+5P8esjzOAEGMdYcjHNPINnvepexqnUv9KOpiYfDTWCq6b3jYf9BmR05S0byM7DTc9c4HSwt4F1nUxYuWotR/sr2A6GjdncTwSTQiVIOs48yz/rVI/GGMWBCAzLZzSvWGcA5EkhFNKUH1AB7+phuXPpLUibSVyKyKNPLcpKClfuvzY+aRDtMFzSJlmslDq0lgw1znf1Uwg44u9FFCV0CmedTagSBvyyspszCIva6iOcqNZX8KZYVmpgS6Dbf3DE6KJ4PabfBuRKwlfe/Ot0Y9BsiqPjJ6td/dHbCb0RXHUvSnqPgGhs74vtrJqeuKfq1MAAA5FSURBVNt8SvsOQzbGp8R33jgw6lVYj+8Pku8l5Ol7OzrcuJlejDLX6w/vZ4BLglFo6Oj4NrL8oyXfq9jc/7hyR4eBwg4Np3SXj+sCvxTb8aCx5wGUamdEkKzWOa/M/+OH9+QdivnzjJFVwLJDaWRXjQ882w6PPJShHCAb4ITKZ0eNiCvuXMbFc+7ZrMEvebUygxw293e35JsGMMfxnaGGzE97Uj+MZaHw/IxZrqLMP9+9sWVVn68Z7uPlfirO0kBBtxgm0iBtQFdbzcnXnbH4ToyqvaxslLre1f1qs7kn3N0a9Zmfeaq2KwwoM2Oa1NmOIWNIIO5r9JOqMqrUSV0qNPBLKjT3TJeNXJItX1SsjfCokIkzJmgoEOSzCORB48GOV4vaoGOiU4aMSE1B1RLvAkh/xg7PINKkbEA3mCdxfAgrENP8nlImY58E/VAi6eSNSG7ga3waGFwnPxbGgZUljInKZowu2LmpzgY49jlp+NCjwSi+StvRZZxN3PEzJt+Y1aTV7DloqIbxmXzDGN7SX4L8o6JJKTA+jCYBlUitEUvgQuXWlGEA7VEG5Z2zJieFztzawJWi8uMoyQfRUPBjCqpFgZCfxqzZKREZqmcoqGxkh/jGG0ooSJ900dkXgYRQ9ju6W/X5DYzNzAcaoEC6PCipKZws4otaXWXh0/lVSoWWgDDCvqsrRY9tysh7LLzKqG/dA/pqSC6rDWZvDqfq5nGhui+hNvAt7fUk0odvZMR+Amd35wZrF+D7MIAwdpb7uWgzzkAmPl70jycBtU1q08ZQbsqoWuWG8B5jWBKYWrOcW+xj0G0Cdso1ll+qwPCmNCOGQzl1v63eZAT68NVarkT+1kVjc8/liTJU0+h5avdOqFjQJoNLQFBXWqZ/1Xg0ygQNsF8UykiJ3Er98un5fosJ2pwRW3/Tj8kGPE3RLjxEm3sSLj7o9uEb5arpGBgse5jjOTbtNWZZ2ht8kWYVXOaJ80R3ZAkoExoJjZzp0chvFDrTEJA9NqObuG1VmE2JThBuRGojUCXSOboUe32qdWIbnC8NWH/4pyf9cOJQqJ6nhbGYYVMYAD14YY94UrHImV4aivAQ1rfGhOoIsznICzLbn3ZD3ecEx+M7m4W2DMi0waY9BwzYf+HfHhi0hfXz3Kjk7JWcaEBK4hjnYcg/DW4HfPp9HG7rVBWU4kdsAg+BfZQ+Gm9NIde5mVSI7sdNHYsjunqoCBT2yWSgoWCpIJS58I3FyfKXsa+t/DGcxbafEU6Sn8LpuXRHCMUmIaMTQtwj7FC+syzZNxuWOjOE8m9hVGYvXtZerkzKuM1Pn0Q0TxKdCpo5Ob+YvstXLBlPlNGNUEhgxA5Z5DHYo70pvp+4YdTqo/j+BysblMGSI00w02UE7Wkv4MW7kMAWMvt0QN01GZ88g0bDl8fv7ZDvPDH3NcInGHOEoMPjzAsua7rYxHm63ESpJaY+61NBFz/nEm//IKrv8pVRoTXXcynqMfg8oFMeI/shNMIKBP0EyqU3nRquGvDfMb1zqSA+x5IEgppmGtZgcISKPSUFKE57Ic153Y37QR0KvCilp3CLMHq22Chfhdtq9xIkCDTRRRTv1pkPEbqgiX5S8MwZMDfCDTfHM0Oy6qLq4jFLXmjMXvmc8GficNbsQdg3fQtgkm3DlLkvhUeJZ9ecp1YydkDwVOt0WIarGQXg1W49T7UErq0yo7cB8HgVyHpjVPaeDRULIYBzZkFJoTD3Yrx7JlCrf/T3kGxL2WPmV5zkKkUc66GR7/qgh+2Ydb3+8P7S0JgovkRqml4gLThEGaxeS4qQ6Dm6BDj7UCKp9Lz+/tdnT3oGAgXWcIKle8TIaTVH1j7ohmWmntWxL5rulzBpaBfJYUqvI3OdjxyraFAetfdsqjjn91xXmCxD0/FrxvkAYxCsIypd4mGWVjMgCLcHEuAGb7ZTRATpIjy/x+U7z6TmsFzcH+FR4Y/Y81x/eA878ZnvLIXapB3YJTUqMeBoEkADtFa6F8G4fAUxbUMdUpTZfToBSLWbShGyXnBk7YNIuCPWCOwZYJQJGbxWBeKyQs9saBvj8txwVLp5SQYMU75wzu6mQgTTtTaFNpLqeaql5dLZ4COtoiiR3SAP+wgSWHJkW+RAJqchep5aZcswxknHNSbfNGDY/+LpKh+WTSyRF5O9jR5ESYKhMfBgCfzh9W9LNLZaA2winMj2TVPcUwlnY0VZax0eYa1KGco4uCSQ00Py1lu3xrZGWoNXG51BSVzpeaql4aIiQVQt3mAtuifPSL7f3bDJX+PFp94kXx9nLD+UvVW+ep4p4b6u5JcJv3Ohk/yz+DlaydHIC4OWoIHfeu8ksa4wiAj2W/B9BRr2KKziKTcAw6Tn1cQ3aDW8kyPWUCHPdr4zo1flAgY1O+JbjeAzy0m3CgyPBqQqlSM8f/Xqv98NMR6C2ccEv391BEkMJ9HQcXi8dfEcm78aSzAao0ONTk7/7MXL4Oe5lchupCjZBQUdNE5lus0dKaOy+2UHAr+hl7u0yj8tT15dCg2eZy9eLhsUif0ml4x9hTdogwZa5/yKSCoPd6UKyncoaLQTsswlGRVqCyJXM7Sdav3wWSE/pK2VGe1nQXqIK+7N/d1tiH6BsKdnc//jqoFuOjuAb7ZZsFQf9GCWz7Ijrnazf1QDHW9JNSI+HyaBr179eoM1l3wjrR+tOPvYyYkdhx11F7LzUfFiNPwOo6ylQienH7EaUL03H7GGWw2UsPIUn670OkWzo0x+XWfahVqfPfJIXmfo8ACjwDNiaooJYdJgiBh1ZAgvkWHWVLyJTIUxg6FTLfwemalRyW3V5+AsAZnC0Bs7S5gVfwJmlggP3fajnKEI0m9qswH8TUN7qaGSLgJryh5hQ/iuDUyMMiF5OJpL1j+XuuhSLuwfyLN0u5lsNCAlsRz2wGUrDJUXg6gYs4izj7LEeCpkQIcsJ8aTUSo0K0CMVZ6hDom4/e8tFFQHvyEjV2RolLmmISoCRvRs7lf2mG5DFvalsVxh+Ibu6DJryH+UYFtm9blpM7hPnhvsAzS0KWyCQKa2zWZ5hGa5Lg/7Ecxtz5N2Od/8QOa+8gff9b6wwayppb1m/6Ko1CJvB4533y2MaTQgvlj29PPlShoPjCz8TteH2uaXt89Co4E+aR81ju2QMK4DC8kOc9mkjL0OOZBsOzrpWn5hCIA5pLOvDJQOOzTSney2vPaXLWVK5VlTjA0b8icrR1dGfjzrCLK+NP3LbZMTf/3h/YzpbUDLD3GAe2lQpxjEwDX20/AG7WL94T3fqaExaKFQjyJNg01s8lGPbQ4h/try/WOt3mwq7IUQx/qH/dAIFuWIBmSY8ErYNBxcssLG2noP4yGYBrJjlmg+7ENC5ccGVwLwyfCDWYOMSKdEG2F8DtK2io6dMev0jXhIbEfVrR0GSLzzDjljp0betwgjXfJFWEn55TPGlaEcj+S7m4bA7Do70+0idz6bDzvv+sN7GLsVn3exng/8rfBYAqTjM4Kb7nAdSuVEmpMtqDTRK8kU8uKJM+L6gOTu7pevw667TenFz2+A39IT/2LdZ+VWl5Ctq3sfxfntMhONAPFdYF/X5oM9DLYHpqdbStvwngbTlfDyB4aTjkFfOBbfPk20qUWeVZtjBztrtFkfKfnluy/VFMFncmp+33AMXrLKCwOlfDm1z5Zw5M4GUgU23pztg5yP2Jeo0mZYG9HN/cqu4TKdQQdipzYY0WWg+Gc9HNkNelva0sQ0/uOOH/5JFQEK/e6W/BBnjc5ShZoyILIHTEd5MZ2x/PIT2OaafK+zUWiWz893nTPPjzv+WE4LpO1lV/NuoLiQj8X1XfJVRWZYjoPtJPLJl8gIn8ljSaYsd45b0CZ/juaQfF0a321KX82z7zPp+fR9P+PIO2kZW0cssynV0UfInnh+uqpfz7++4j6BD9w7qOJVn5VSQ1cqLAnWF/lao12aA/i2xPIf0mSbWqNtGkuT7cBAFgTKxbYF9jH0jVVtsJPkdKLTIQFnNLhUxRnHvobDZoMR9dSMh+XL/5mg3zZ2KEgqswwapucT4T3jFwYQxqpLGT00yxmvP67IJ/0Pzc+p8mdZszLf3dIdlC9mEtwn8AHGofStqCo9GhuE1QyICpwUA17jfRDfDVQzmq69ZvJgWAO6DT57A7KV5IbLSMeH/35HY0H46vVvxhkNVHSt8q0ke/4YkVXc9+gprIgWJTBlCWAfIcQejcjsxculxgxF2yPn36ScmTAM/f8qlAb6hUuEoahJhyWT5q4Pc8pc2dmAUovjuuZKiaQEOdJlRFZ//+7LYgPqSGQjmSiBKIEHkMDmfmX3iRqyTrEu+I7HuC1QP0GfhHChY6qznxDaJMPO34BMUqwBprBsFY1HQC4xKErgjCXA/YOem9BNpVx9xH5LU+TUw6MBOUENGWWu47LVCQQds4gSeAAJWCOCPo6sV4C+N49H2wMJfRNMES8akHFrZcPTVk/9K7vjirhOPYZECZxaApv7u9t1fjqKS1IE8OAMCk8vbRjG2QoHlMCdDd60B8Gp3dGAjFUjWLL65bsvZ/G01VgCjnSjBKYnAe6LfMSSFAFGgjMMHoG1x6IZxtkKjc30ON+Po2hA9pNbYypulCfGzOKSVaOIYkSUQJTAI5FA3YA8koI9QDGy5arvvryM37Z6AOnHLKMEogROLoFoQA4T+UawVMV9jrhcdZggY+oogSiB85NANCDD68waDbtMhT0OLlXFfY7hQowpghKIgVECZyWB6RoQjOw5un9IMMpcc3aRGwv3zTC7vxGXqc6qnUdmowSiBEaQwGQNCEf2Dw08fsvZRTQWI7S8SDJKIErg7CUwWQOyj2RjmiiBKIEogSiB00ngfwAAAP///HmBngAAAAZJREFUAwCjbTPY1dC6IAAAAABJRU5ErkJggg=='},
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 0 10px 0; background-color: #ffffff;">
                    <a href="${settings.website || '#'}" target="_blank">
                        <img src="${fields.logoUrl}" width="150" alt="${fields.companyName}" style="display: block; border: 0; max-width: 150px; height: auto;">
                    </a>
                </td>
            </tr>
        `
    },


    'text_header_block': {
        name: 'Header & Text Block',
        isCustom: false,
        fields: [
            { id: 'blockTitle', label: 'Block Title/H2', type: 'text', default: 'A Section Title' },
            { id: 'blockBody', label: 'Main Text Content', type: 'textarea', default: 'This is a paragraph of text content for this section. It can be edited by the user in the main editor.' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td style="padding: 30px 40px 20px 40px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                    <h2 style="color: ${settings.brandcolor}; font-size: 20px; margin: 0 0 15px 0;">
                        ${fields.blockTitle || 'Block Title'}
                    </h2>
                    <p style="margin: 0;">
                        ${fields.blockBody ? fields.blockBody.replace(/\\n/g, '<br>') : 'Body placeholder...'}
                    </p>
                </td>
            </tr>
        `
    },
    

    'zoom_details_block': {
        name: 'Zoom/Meeting Details',
        isCustom: false,
        fields: [
            { id: 'meetingTopic', label: 'Meeting Topic', type: 'text', default: 'Q3 Strategy Review' },
            { id: 'meetingDate', label: 'Date/Time', type: 'text', default: 'Wednesday, October 27th @ 10:00 AM' },
            { id: 'meetingLink', label: 'Join Meeting URL', type: 'text', default: 'https:www.example.com'}
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 40px;">
                    <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                        <tr>
                            <td style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                                <p style="margin: 0 0 5px 0; font-weight: bold; color: ${settings.brandcolor};">Meeting Details:</p>
                                <p style="margin: 0 0 5px 0;">
                                    <strong>Topic:</strong> ${fields.meetingTopic}
                                </p>
                                <p style="margin: 0 0 10px 0;">
                                    <strong>When:</strong> ${fields.meetingDate}
                                </p>
                                <p style="margin: 0;">
                                    <a href="${fields.meetingLink}" target="_blank" style="padding: 8px 15px; border-radius: 3px; font-family: Arial, sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold; background-color: ${settings.brandcolor};">
                                        Join Zoom Call
                                    </a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        `
    },

    'branded-bubble': {
        name: 'Branded Header Diagram',
        isCustom: false,
        fields: [
            { id: 'Badge', label: 'Badge', type: 'text', default: '' },
            { id: 'badgeAlt', label: 'Badge Alt Text', type: 'text', default: '' },
            { id: 'keyMessage', label: 'Key Message', type: 'text', default: 'Important Update' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 10px 10px 10px 10px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="width: 100%; max-width: 600px; background-color: ${settings.brandcolor}; border-radius: 8px;">
                    <tr>
                    <td style="padding: 20px 25px; font-family: Arial, sans-serif; color: #ffffff; font-size: 24px; line-height: 32px; font-weight: bold; vertical-align: middle; text-align: left;">
                        ${fields.keyMessage}
                    </td>
                    <td style="padding: 20px 25px; vertical-align: middle; text-align: right;">
                        <img src="${fields.Badge}" alt="${fields.badgeAlt}" width="80" height="80" style="display: block; border: 0px; outline: none; text-decoration: none; border-radius: 4px;">
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
        `
    },


    'cta_block': {
        name: 'Call to Action Button',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'text', default: 'https://placehold.co/150x50/3730a3/ffffff?text=LOGO' },
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 40px;">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="border-radius: 3px;" bgcolor="${settings.brandcolor}">
                                <a href="${fields.ctaLink || '#'}" target="_blank" style="padding: 12px 18px; border: 1px solid ${settings.brandcolor}; border-radius: 3px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold;">
                                    ${fields.ctaText || 'CTA Button'}
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        `
    },


    'footer_block': {
        name: 'Footer (Legal/Unsub)',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'text', default: 'https://placehold.co/150x50/3730a3/ffffff?text=LOGO' },
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td bgcolor="#f4f4f4" style="padding: 20px 40px; text-align: center; color: #999999; font-family: Arial, sans-serif; font-size: 11px;">
                    <p style="margin-bottom: 5px;">
                        <a href="${fields.unsubLink}" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                    </p>
                    <p style="margin: 0;">
                        ${fields.legalText ? fields.legalText.replace(/\\n/g, '<br>') : 'Legal text placeholder...'}
                    </p>
                </td>
            </tr>
        `
    },


    'custom_code_block': {
        name: 'Custom HTML/Fields',
        isCustom: true,
        fields: [] 
    }
};

function renderBuilderUI() {
    const listContainer = document.getElementById('prefab-blocks-list');
    listContainer.innerHTML = ''; 


    for (const id in PREFAB_BLOCKS) {
        const block = PREFAB_BLOCKS[id];
        
        if (block.isCustom) {

            const customConfigDiv = document.getElementById('custom-block-config');
            if (customConfigDiv) customConfigDiv.classList.remove('hidden');

            const heading = document.createElement('h3');
            heading.className = 'text-lg font-semibold mb-3 text-gray-700 mt-6';
            heading.textContent = 'Advanced Block';
            listContainer.appendChild(heading);
            
        } else {
            const button = document.createElement('button');
            button.textContent = block.name;
            button.setAttribute('data-block-id', id);
            button.onclick = () => addPrefabBlock(id);
            button.className = 'block-button'; 
            listContainer.appendChild(button);
        }
    }
    
    renderCanvas();
    generateTemplateCode();
}

function addPrefabBlock(blockId) {
    const block = PREFAB_BLOCKS[blockId];
    if (block) {
        currentBlocks.push({ id: blockId, name: block.name, config: {} });
        renderCanvas();
        generateTemplateCode();
        showFeedback(`${block.name} added to template.`);
    }
}

function addCustomCodeBlock() {
    const customHtml = document.getElementById('custom-html-input').value.trim();
    const customFieldsJson = document.getElementById('custom-fields-json').value.trim();

    if (!customHtml) {
        showFeedback('Error: Custom HTML cannot be empty.');
        return;
    }

    let fields = [];
    try {
        if (customFieldsJson) {
            fields = JSON.parse(customFieldsJson);
            if (!Array.isArray(fields) || fields.some(f => !f.id || !f.label)) {
                 throw new Error('Fields must be a valid array of objects with "id" and "label".');
            }
        }
    } catch (e) {
        showFeedback('Error parsing JSON fields: ' + e.message);
        return;
    }

    currentBlocks.push({
        id: 'custom_code_block',
        name: 'Custom Block',
        config: {
            customHtml: customHtml,
            customFields: fields
        }
    });


    document.getElementById('custom-html-input').value = '';
    document.getElementById('custom-fields-json').value = '';
    
    renderCanvas();
    generateTemplateCode();
    showFeedback('Custom Code Block added to template.');
}

function removeBlock(index) {
    if (index >= 0 && index < currentBlocks.length) {
        const removedName = currentBlocks[index].name;
        currentBlocks.splice(index, 1);
        renderCanvas();
        generateTemplateCode();
        showFeedback(`Removed ${removedName} from template.`);
    }
}

function generatePreviewHtml() {


    const mockSettings = { brandcolor: '#4f46e5', fullname: 'Acme Corp', website: '#' };
    const mockFields = {
        logoUrl: 'https://www.example.com',
        companyName: 'Example',
        blockTitle: 'Live Preview Section',
        blockBody: 'This is a sample paragraph rendered using mock data for context. Your dynamic fields will replace these when the final template is used.',
        ctaText: 'View Details',
        ctaLink: '#',
        unsubLink: '#',
        legalText: '&copy; 2024 example',
        meetingTopic: 'Q4 Planning',
        meetingDate: 'Nov 1st, 9:00 AM',
        meetingLink: '#'
    };
    
    let blocksHtml = '';

    currentBlocks.forEach(blockMeta => {
        const blockDef = PREFAB_BLOCKS[blockMeta.id];
        let html;

        if (blockDef.isCustom) {

            html = blockMeta.config.customHtml;

            if (blockMeta.config.customFields) {
                blockMeta.config.customFields.forEach(field => {
                    const placeholderValue = mockFields[field.id] || field.default || `[${field.label}]`;
                    const regex = new RegExp(`{{\\s*${field.id}\\s*}}`, 'g');
                    html = html.replace(regex, placeholderValue);
                });
            }
        } else {

            html = blockDef.htmlGenerator(mockFields, mockSettings);
        }
        

        html = html.replace(/\$\{(.*?)\}/g, (match, p1) => {

            
            let value = '';

            if (p1.startsWith('settings.')) {
                const key = p1.split('.')[1];
                value = mockSettings[key] || '';

            } else if (p1.startsWith('fields.')) {
                const key = p1.split('.')[1];
                value = mockFields[key] || '';
            } else if (p1.includes('?')) {
                const parts = p1.split(/ \|\| | \?/);
                for(const part of parts) {
                    if (part.includes('fields.')) {
                        const key = part.split('.')[1];
                        if (mockFields[key]) {
                            value = mockFields[key];
                            break;
                        }
                    } else if (part.includes('settings.')) {
                         const key = part.split('.')[1];
                        if (mockSettings[key]) {
                            value = mockSettings[key];
                            break;
                        }
                    } else if (part.startsWith("'") || part.startsWith('"')) {
                        value = part.replace(/['"]/g, '');
                        break;
                    }
                }
            }

            if (p1.includes('.replace(/\\n/g, \'') && value) {
                return value.replace(/\n/g, '<br>');
            }
            return value; 
        });

        blocksHtml += html;
    });

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; padding: 0; background-color: #f3f4f6; }
                table { border-collapse: collapse; }
                
                a { color: inherit; text-decoration: none; }
            </style>
        </head>
        <body>
            
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            
                            ${blocksHtml}
                            
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

function renderCanvas() {
    const structureList = document.getElementById('template-structure-list');
    const iframe = document.getElementById('preview-iframe');
    structureList.innerHTML = ''; 

    if (currentBlocks.length === 0) {
                structureList.innerHTML = `
            <p class="text-center text-gray-500 py-10">
                Click a block on the left to start building.
            </p>
        `;
        iframe.srcdoc = '';
        return; 
    }
    currentBlocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-200';
        div.innerHTML = `
            <span class="font-medium text-sm">${index + 1}. ${block.name}</span>
            <button onclick="removeBlock(${index})" class="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition duration-150">Remove</button>
        `;
        structureList.appendChild(div);
    });
    const previewHtml = generatePreviewHtml();
    iframe.srcdoc = previewHtml;
}

function generateTemplateCode() {
    const output = document.getElementById('template-output');
    if (currentBlocks.length === 0) {
        output.value = '// Add blocks to the canvas to generate code...';
        return;
    }

    let allFields = [];
    let fieldIds = new Set();
    let htmlGeneratorBody = '';
    currentBlocks.forEach(blockMeta => {
        const blockDef = PREFAB_BLOCKS[blockMeta.id];
        
        let blockFields = [];
        let blockHtmlGenerator = '';

        if (blockDef.isCustom) {
            blockFields = blockMeta.config.customFields || [];
            let userHtml = blockMeta.config.customHtml;
            userHtml = userHtml.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, p1) => `\${fields.${p1}}`);
            blockHtmlGenerator = userHtml;

        } else {
            blockFields = blockDef.fields;
            
            const generatorString = blockDef.htmlGenerator.toString();
            const match = generatorString.match(/\=\>\s*\`([\s\S]*)\`$/);
            if (match && match[1]) {
                blockHtmlGenerator = match[1].trim(); 
            }
        }
        blockFields.forEach(field => {
            if (!fieldIds.has(field.id)) {
                allFields.push(field);
                fieldIds.add(field.id);
            }
        });
        htmlGeneratorBody += blockHtmlGenerator;
    });

    const fieldsString = JSON.stringify(allFields, null, 4);
    const finalCode = `'custom_template_${Date.now()}': {
    name: 'Assembled Template (${new Date().toLocaleDateString()})',
    description: 'Template generated by the Block Builder.',
    isfavourite: false,
    custom: true,
    fields: ${fieldsString.replace(/"(\w+)":/g, '$1:')},
    htmlGenerator: (fields, settings) => \`
        
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        
${htmlGeneratorBody}
                        
                    </table>
                </td>
            </tr>
        </table>
    \`
}`;

    output.value = finalCode;
}

function copyTemplateCode() {
    const output = document.getElementById('template-output');
    if (output.value && output.value.length > 0 && output.value !== '// Add blocks to the canvas to generate code...'){
        output.select();
        document.execCommand('copy');
        showFeedback('Template definition copied to clipboard! Ready to paste into your template list.');
    } else {
        showFeedback('Nothing to copy. Please add blocks first.');
    }
}