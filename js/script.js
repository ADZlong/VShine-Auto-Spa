/* VShine Auto Spa - Vanilla JS features: 
   - Price calculator
   - Booking form validation (inline errors only)
   - Character counter for Additional Notes
*/

(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --------------------
  // PRICE CALCULATOR (services.html)
  // --------------------
  const calcBtn = document.getElementById("calcBtn");
  if (calcBtn) {
    const vehicleTypeEl = document.getElementById("vehicleType");
    const packageEl = document.getElementById("packageType");
    const waxingEl = document.getElementById("extraWaxing");
    const engineEl = document.getElementById("extraEngine");
    const outputEl = document.getElementById("calcOutput");

    const baseByPackage = {
      basic: 30,
      premium: 120,
      ceramic: 350,
    };

    const vehicleMultiplier = {
      sedan: 1,
      suv: 1.15,
      mpv: 1.25,
    };

    function money(n) {
      // round to nearest RM integer for beginner-friendly output
      return Math.round(n);
    }

    calcBtn.addEventListener("click", function () {
      const vehicle = vehicleTypeEl ? vehicleTypeEl.value : "sedan";
      const pkg = packageEl ? packageEl.value : "basic";

      const base = baseByPackage[pkg] ?? 0;
      const mult = vehicleMultiplier[vehicle] ?? 1;

      const waxingCost = waxingEl && waxingEl.checked ? 20 : 0;
      const engineCost = engineEl && engineEl.checked ? 40 : 0;

      const total = base * mult + waxingCost + engineCost;

      if (outputEl) {
        outputEl.textContent = `Estimated Price: RM${money(total)}`;
      }
    });
  }

  // --------------------
  // BOOKING FORM VALIDATION (booking.html)
  // --------------------
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    const getVal = (id) => document.getElementById(id)?.value.trim() ?? "";

    const nameEl = document.getElementById("customerName");
    const emailEl = document.getElementById("customerEmail");
    const phoneEl = document.getElementById("customerPhone");

    const vehicleEls = document.getElementsByName("vehicleType");
    const packageSel = document.getElementById("servicePackage");
    const dateEl = document.getElementById("appointmentDate");
    const notesEl = document.getElementById("additionalNotes");

    const err = {
      name: document.getElementById("errName"),
      email: document.getElementById("errEmail"),
      vehicle: document.getElementById("errVehicle"),
      package: document.getElementById("errPackage"),
      date: document.getElementById("errDate"),
    };

    function showErr(el, msg) {
      if (!el) return;
      el.textContent = msg;
      el.classList.add("show");
    }

    function hideErr(el) {
      if (!el) return;
      el.textContent = "";
      el.classList.remove("show");
    }

    function isValidEmail(email) {
      // Simple, beginner-friendly email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function selectedVehicle() {
      for (const r of vehicleEls) {
        if (r.checked) return r.value;
      }
      return "";
    }

    // Character counter
    if (notesEl) {
      const counterEl = document.getElementById("notesCounter");
      const max = 200;
      function updateCounter() {
        const len = notesEl.value.length;
        if (counterEl) counterEl.textContent = `${len} / ${max} Characters`;
        if (len > max) notesEl.value = notesEl.value.substring(0, max);
      }
      notesEl.addEventListener("input", updateCounter);
      updateCounter();
    }

    bookingForm.addEventListener("submit", function (e) {
      // Reset errors
      Object.values(err).forEach(hideErr);

      const name = nameEl ? nameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const vehicle = selectedVehicle();
      const pkg = packageSel ? packageSel.value : "";
      const date = dateEl ? dateEl.value : "";

      let hasError = false;

      if (!name) {
        showErr(err.name, "Customer name is required.");
        hasError = true;
      }

      if (!email) {
        showErr(err.email, "Email address is required.");
        hasError = true;
      } else if (!isValidEmail(email)) {
        showErr(err.email, "Please enter a valid email format.");
        hasError = true;
      }

      if (!vehicle) {
        showErr(err.vehicle, "Please select a vehicle type.");
        hasError = true;
      }

      if (!pkg) {
        showErr(err.package, "Please select a service package.");
        hasError = true;
      }

      if (!date) {
        showErr(err.date, "Please choose an appointment date.");
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
      }
    });
  }
})();
