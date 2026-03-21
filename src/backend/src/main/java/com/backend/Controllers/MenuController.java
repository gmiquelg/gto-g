package com.backend.Controllers;

import com.backend.Models.Menu;
import com.backend.Models.MenuItem;
import com.backend.Repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping("/{code}")
    public List<MenuItem> getMenuItems(@PathVariable String code) {
        Optional<Menu> menu = menuRepository.findByCode(code);
        if (menu.isPresent()) {
            List<MenuItem> items = menu.get().getItems();
            items.sort(Comparator.comparing(MenuItem::getOrder));
            return items;
        }
        return Collections.emptyList();
    }
}
